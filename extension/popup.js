document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetchData");
  const statusDiv = document.getElementById("status");

  const ENDPOINT = "/api/submissions/?offset=0&limit=20";

  fetchButton.addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [ENDPOINT],
        func: fetchSubmissions,
      });

      showStatus(
        "Request sent! Check the console for response data.",
        "success"
      );
    } catch (error) {
      showStatus(`Error: ${error.message}`, "error");
      console.error("Extension error:", error);
    }
  });

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
    let paginatedUrl = `${url}&offset=${offset}`;
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
      console.log("Fetched Submissions:", data.submissions_dump.length);

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
