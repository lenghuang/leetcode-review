import './popup.css';
import { createClient } from '@supabase/supabase-js';

const Config = {
  LEETCODE_DOMAIN: 'leetcode.com',
  API_ENDPOINT: '/api/submissions/',
  PAGE_SIZE: 20,
  TIMEOUT_MS_BETWEEN_FETCH: 1000,
  RECODE_SYNC_PATH: '/api/extension/syncSubmissions',
  RECODE_LOGIN_PATH: '/sign-in?isExtension=true',
  // COOLDOWN_MINUTES: 5, // prod
  // RECODE_HOST: "https://leetcode-review.vercel.app", // prod
  // MAX_PAGES: 10000, // prod
  RECODE_HOST: 'http://localhost:3000', // dev
  MAX_PAGES: 3, // dev
  COOLDOWN_MINUTES: 0.25, // dev
};

//#region ChromeHelpers

const getActiveTab = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab;
};

const getActiveTabUrl = async () => {
  return (await getActiveTab())?.url || '';
};

const checkLastFetchTime = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get('lastFetchTime', (data) => {
      resolve(data?.lastFetchTime);
    });
  });
};

const storeLastFetchTime = async () => {
  chrome.storage.local.set({ lastFetchTime: Date.now() });
};

//#endregion

//#region Supabase Helpers

const getSupabaseTokens = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(['authToken', 'codeVerifier'], (data) => {
      resolve({
        accessToken: data.authToken,
        refreshToken: data.codeVerifier,
      });
    });
  });
};

const initSupabaseClient = async () => {
  const { accessToken, refreshToken } = await getSupabaseTokens();

  if (!accessToken || !refreshToken) {
    console.warn('No Supabase tokens found in storage');
    return null;
  }

  try {
    const supabase = createClient(
      process.env.CHROME_PUBLIC_SUPABASE_URL ?? '',
      process.env.CHROME_PUBLIC_SUPABASE_ANON_KEY ?? '',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      }
    );

    // Set the session manually
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      console.error('Error setting Supabase session:', error);
      return null;
    }

    return supabase;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};

const isLoggedInToRecode = async () => {
  try {
    const supabase = await initSupabaseClient();
    if (!supabase) {
      console.log('Supabase client initialization failed');
      return false;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error getting user:', error);
      return false;
    }

    return !!user;
  } catch (error) {
    console.error('Error in isLoggedInToRecode:', error);
    return false;
  }
};

//#endregion

//#region Fetch Submissions
const fetchSubmissions = async (
  endpoint,
  pageSize,
  maxPages,
  timeoutDuration,
  proxyEndpoint
) => {
  // This is executed within the as a script within the tab, so it must have
  // arguments (like endpoint, pageSize, etc) passed to it.
  let hasMore = true;
  let pageCount = 0;

  let offset = 0;
  let lastKey = '';

  while (hasMore && pageCount < maxPages) {
    const paginatedUrl = `${endpoint}?offset=${offset}&limit=${pageSize}&lastkey=${lastKey}`;

    try {
      const response = await fetch(paginatedUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Fetch failed:', response.statusText);
        return;
      }

      const data = await response.json();

      if (
        data.submissions_dump &&
        data.submissions_dump.length &&
        data.has_next
      ) {
        pageCount++;
        offset += pageSize;
        lastKey = data.last_key ?? '';
      } else {
        hasMore = false;
      }

      const proxyResponse = await fetch(proxyEndpoint, {
        method: 'POST',
        body: JSON.stringify({ submissions: data }),
        headers: {},
      });

      if (!proxyResponse.ok) {
        console.warn('Proxy fetch failed:', proxyResponse.statusText);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, timeoutDuration)); // Avoid rate limiting
    } catch (error) {
      console.error('Fetch error:', error);
      return;
    }
  }
};

const executeFetchSubmissions = async () => {
  const tab = await getActiveTab();
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [
      Config.API_ENDPOINT,
      Config.PAGE_SIZE,
      Config.MAX_PAGES,
      Config.TIMEOUT_MS_BETWEEN_FETCH,
      `${Config.RECODE_HOST}${Config.RECODE_SYNC_PATH}`,
    ],
    func: fetchSubmissions,
  });
};
//#endregion

//#region UpdateHTML

const showStatus = (message) => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.style.display = 'block';
};

//#endregion

//#region Helpers

const isLeetCodeDomain = async () => {
  return (await getActiveTabUrl()).includes(Config.LEETCODE_DOMAIN);
};

const getCooldownMinutesLeft = async () => {
  const lastFetchTime = await checkLastFetchTime();
  const now = Date.now();
  const elapsedMinutes = (now - lastFetchTime) / (1000 * 60);
  if (elapsedMinutes < Config.COOLDOWN_MINUTES) {
    const remainingMinutes = Config.COOLDOWN_MINUTES - elapsedMinutes;
    return remainingMinutes;
  }
  return 0;
};

const openRecodeLoginTab = async () => {
  await chrome.tabs.create({
    url: `${Config.RECODE_HOST}${Config.RECODE_LOGIN_PATH}`,
  });
};

//#endregion

document.addEventListener('DOMContentLoaded', async () => {
  // Get references to HTML elements
  const fetchButton = document.getElementById('fetchData');
  const loginButton = document.getElementById('loginButton');
  const mainContent = document.getElementById('mainContent');
  const loggedInContent = document.getElementById('loggedInContent');
  const loggedOutContent = document.getElementById('loggedOutContent');

  // Disable button if not on LeetCode
  if (!(await isLeetCodeDomain())) {
    showStatus('This extension only works on LeetCode.');
    return;
  }

  // Display content based on user's login
  mainContent.style.display = 'block';
  if (await isLoggedInToRecode()) {
    loggedInContent.style.display = 'block';

    // Check if cooldown has passed, and disable button if not
    const minutesLeft = await getCooldownMinutesLeft();
    if (minutesLeft > 0) {
      showStatus(
        `Slow down! You have ${minutesLeft.toFixed(
          1
        )} minutes before you can sync again.`
      );
      fetchButton.disabled = true;
      return;
    }

    // Attach the listener to the button
    fetchButton.addEventListener('click', async () => {
      showStatus("Syncing! You're safe to close this window without worries.");
      executeFetchSubmissions();
      storeLastFetchTime();
    });
  } else {
    loggedOutContent.style.display = 'block';

    // Attach the listener to the button
    loginButton.addEventListener('click', async () => {
      openRecodeLoginTab();
    });
  }
});
