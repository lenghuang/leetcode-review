document.addEventListener("DOMContentLoaded", async () => {
  const fetchButton = document.getElementById("fetchData");
  const statusDiv = document.getElementById("status");
  const API_ENDPOINT = "/api/submissions/";

  // Disable button if not on LeetCode
  const isLeetCodeDomain = (await getActiveTabUrl()).includes("leetcode.com");
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

      showStatus("Loading...", "Secondary");

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [API_ENDPOINT],
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
async function fetchSubmissions(endpoint) {
  let hasMore = true,
    offset = 0,
    lastKey = null;

  while (hasMore) {
    let paginatedUrl = `${endpoint}?offset=${offset}&limit=20`;
    if (lastKey) {
      paginatedUrl += `&lastkey=${encodeURIComponent(JSON.stringify(lastKey))}`;
    }

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
        !data.submissions_dump ||
        !data.submissions_dump.length ||
        !data.has_next
      ) {
        hasMore = false;
      } else {
        lastKey = data.last_key;
        offset += 20;
      }

      hasMore = false;
    } catch (error) {
      console.error("Fetch error:", error);
      break;
    }
  }
}
