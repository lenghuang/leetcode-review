const Config = {
  LEETCODE_DOMAIN: "leetcode.com",
  COOLDOWN_MINUTES: 5,
  API_ENDPOINT: "/api/submissions/",
  PAGE_SIZE: 20,
  MAX_PAGES: 10,
  TIMEOUT_MS_BETWEEN_FETCH: 1000,
};

//#region Fetchers
const fetchSubmissions = async (
  endpoint,
  pageSize,
  maxPages,
  timeoutDuration
) => {
  // This is executed within the as a script within the tab, so it must have
  // arguments (like endpoint, pageSize, etc) passed to it.
  let hasMore = true;
  let pageCount = 0;

  let offset = 0;
  let lastKey = "";

  while (hasMore && pageCount < maxPages) {
    const paginatedUrl = `${endpoint}?offset=${offset}&limit=${pageSize}&lastkey=${lastKey}`;

    try {
      const response = await fetch(paginatedUrl, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Fetch failed:", response.statusText);
        break;
      }

      const data = await response.json();

      if (
        data.submissions_dump &&
        data.submissions_dump.length &&
        data.has_next
      ) {
        pageCount++;
        offset += pageSize;
        lastKey = data.last_key ?? "";
      } else {
        hasMore = false;
      }

      await new Promise((resolve) => setTimeout(resolve, timeoutDuration)); // Avoid rate limiting
    } catch (error) {
      console.error("Fetch error:", error);
      break;
    }
  }
};
//#endregion

//#region ChromeHelpers

const getActiveTab = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab;
};

const getActiveTabUrl = async () => {
  return (await getActiveTab())?.url || "";
};

const checkLastFetchTime = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get("lastFetchTime", (data) => {
      resolve(data?.lastFetchTime);
    });
  });
};

const storeLastFetchTime = async () => {
  chrome.storage.local.set({ lastFetchTime: Date.now() });
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
    ],
    func: fetchSubmissions,
  });
};

//#endregion

//#region UpdateHTML

const showStatus = (message, type) => {
  const statusDiv = document.getElementById("status");
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  statusDiv.style.display = "block";
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

//#endregion

document.addEventListener("DOMContentLoaded", async () => {
  // Get references to HTML elements
  const fetchButton = document.getElementById("fetchData");
  const mainContent = document.getElementById("mainContent");

  // Disable button if not on LeetCode
  if (!(await isLeetCodeDomain())) {
    mainContent.style.display = "none";
    showStatus("This extension only works on LeetCode.", "error");
    return;
  }

  // Check if cooldown has passed, and disable button if not
  const minutesLeft = await getCooldownMinutesLeft();
  if (minutesLeft > 0) {
    showStatus(
      `Please wait ${minutesLeft.toFixed(1)} minutes before fetching again.`,
      "warning"
    );
    fetchButton.disabled = true;
    return;
  }

  // Attach the listener to the button
  fetchButton.addEventListener("click", async () => {
    showStatus("Request received! Feel free to exit this window.", "secondary");
    executeFetchSubmissions();
    storeLastFetchTime();
    // TODO: add a check for LEETCODE_SESSION being present
    showStatus("Synced! You'll soon see personalized lesson plans.", "success");
  });
});
