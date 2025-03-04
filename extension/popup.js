document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const targetUrlInput = document.getElementById("targetUrl");
  const saveUrlButton = document.getElementById("saveUrl");
  const enableFetchingCheckbox = document.getElementById("enableFetching");
  const fetchNowButton = document.getElementById("fetchNow");
  const lastFetchTimeSpan = document.getElementById("lastFetchTime");
  const fetchLogsDiv = document.getElementById("fetchLogs");

  // Load current settings
  loadStatus();

  // Set up event listeners
  saveUrlButton.addEventListener("click", saveUrl);
  enableFetchingCheckbox.addEventListener("change", toggleFetching);
  fetchNowButton.addEventListener("click", fetchNow);

  // Function to load current status
  function loadStatus() {
    chrome.runtime.sendMessage({ action: "getStatus" }, (response) => {
      if (response) {
        // Update URL input
        targetUrlInput.value = response.targetUrl || "";

        // Update toggle
        enableFetchingCheckbox.checked = response.isEnabled !== false;

        // Update last fetch time
        if (response.lastFetchTime) {
          const date = new Date(response.lastFetchTime);
          lastFetchTimeSpan.textContent = date.toLocaleString();
        } else {
          lastFetchTimeSpan.textContent = "Never";
        }

        // Update logs
        updateLogs(response.fetchLogs || []);
      }
    });
  }

  // Function to save URL
  function saveUrl() {
    const url = targetUrlInput.value.trim();
    if (!url) {
      alert("Please enter a valid URL");
      return;
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      alert("Please enter a valid URL including http:// or https://");
      return;
    }

    chrome.runtime.sendMessage(
      {
        action: "updateUrl",
        url: url,
      },
      (response) => {
        if (response && response.status) {
          // Show success indicator
          saveUrlButton.textContent = "✓";
          saveUrlButton.disabled = true;

          setTimeout(() => {
            saveUrlButton.textContent = "Save";
            saveUrlButton.disabled = false;
          }, 1500);
        }
      }
    );
  }

  // Function to toggle fetching
  function toggleFetching() {
    const isEnabled = enableFetchingCheckbox.checked;

    chrome.runtime.sendMessage({
      action: "toggleFetching",
      isEnabled: isEnabled,
    });
  }

  // Function to trigger immediate fetch
  function fetchNow() {
    fetchNowButton.textContent = "Fetching...";
    fetchNowButton.disabled = true;

    chrome.runtime.sendMessage({ action: "fetchNow" }, (response) => {
      if (response) {
        fetchNowButton.textContent =
          response.status === "Manual fetch completed" ? "Success!" : "Error";

        setTimeout(() => {
          fetchNowButton.textContent = "Fetch Now";
          fetchNowButton.disabled = false;

          // Reload status to update the UI
          loadStatus();
        }, 1500);
      }
    });
  }

  // Function to update logs display
  function updateLogs(logs) {
    if (!logs || logs.length === 0) {
      fetchLogsDiv.innerHTML = '<p class="empty-logs">No logs yet</p>';
      return;
    }

    fetchLogsDiv.innerHTML = "";

    logs.forEach((log) => {
      const logEntry = document.createElement("div");
      logEntry.className = `log-entry ${log.status}`;

      const date = new Date(log.time);
      const formattedTime = date.toLocaleString();

      logEntry.innerHTML = `
          <div><strong>${formattedTime}</strong></div>
          <div>URL: ${log.url}</div>
          <div>Status: ${log.status}</div>
          ${log.error ? `<div>Error: ${log.error}</div>` : ""}
        `;

      fetchLogsDiv.appendChild(logEntry);
    });
  }
});
