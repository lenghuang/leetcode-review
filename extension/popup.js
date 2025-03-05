document.addEventListener("DOMContentLoaded", () => {
  // TODO: Disable button if non-leetcode domain

  const fetchButton = document.getElementById("fetchData");
  const statusDiv = document.getElementById("status");

  fetchButton.addEventListener("click", async () => {
    try {
      console.log("click received");

      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      console.log("current tab", tab);

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: ["/api/submissions/"], // TODO: Move to consts
        func: fetchSubmissions,
      });

      console.log("done running script");

      showStatus(
        "Request sent! Check the console for response data.",
        "success"
      );
    } catch (error) {
      showStatus(`Error: ${error.message}`, "error");
      console.error("Extension error:", error);
    }
  });

  // Inline function to display styling
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = "block";
  }
});

// This function runs inside the webpage to fetch paginated submissions
async function fetchSubmissions(endpoint) {
  let url = endpoint.startsWith("/")
    ? `${window.location.origin}${endpoint}`
    : endpoint;
  let hasMore = true,
    offset = 0,
    lastKey = null;

  while (hasMore) {
    let paginatedUrl = `${url}?offset=${offset}&limit=${20}`;
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
        console.error("Error fetching data:", response.statusText);
        break;
      }

      const data = await response.json();

      if (!data.submissions_dump.length || !data.has_next) {
        hasMore = false;
      } else {
        lastKey = data.last_key;
        offset += 20;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      break;
    }
  }
}
