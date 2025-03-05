document.addEventListener("DOMContentLoaded", async () => {
  const fetchButton = document.getElementById("fetchData");
  const statusDiv = document.getElementById("status");
  const API_ENDPOINT = "/api/submissions/";
  const PAGE_SIZE = 20;
  const MAX_PAGES = 3;
  const LEETCODE_DOMAIN = "leetcode.com";

  // Disable button if not on LeetCode
  const isLeetCodeDomain = (await getActiveTabUrl()).includes(LEETCODE_DOMAIN);
  if (!isLeetCodeDomain) {
    fetchButton.disabled = true;
    showStatus("This extension only works on LeetCode.", "error");
    return;
  }

  fetchButton.addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      showStatus("Loading...", "secondary");

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [API_ENDPOINT, PAGE_SIZE, MAX_PAGES],
        func: fetchSubmissions,
      });

      showStatus(
        "Request loaded! Check the console for response data.",
        "success"
      );
    } catch (error) {
      console.error("Extension error:", error);
      showStatus(`Error: ${error.message}`, "error");
    }
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = "block";
  }

  async function getActiveTabUrl() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab?.url || "";
  }
});

// Function to fetch paginated submissions
async function fetchSubmissions(endpoint, pageSize, maxPages) {
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
      console.log("Fetched data:", data);

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
    } catch (error) {
      console.error("Fetch error:", error);
      break;
    }
  }
}
