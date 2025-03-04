// Initialize when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Set default values in storage
  chrome.storage.local.set({
    targetUrl: "https://example.com",
    lastFetchTime: null,
    isEnabled: true,
    fetchLogs: [],
  });

  // Create an alarm that fires daily
  chrome.alarms.create("dailyFetch", {
    periodInMinutes: 24 * 60, // 24 hours
  });

  console.log(
    "Daily Page Fetcher extension installed. Alarm set for daily fetches."
  );
});

// Listen for alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dailyFetch") {
    performScheduledFetch();
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateUrl") {
    chrome.storage.local.set({ targetUrl: message.url });
    sendResponse({ status: "URL updated successfully" });
  } else if (message.action === "toggleFetching") {
    chrome.storage.local.set({ isEnabled: message.isEnabled });
    sendResponse({
      status: `Fetching ${message.isEnabled ? "enabled" : "disabled"}`,
    });
  } else if (message.action === "fetchNow") {
    performScheduledFetch()
      .then(() => sendResponse({ status: "Manual fetch completed" }))
      .catch((error) =>
        sendResponse({ status: "Error", error: error.message })
      );
    return true; // Required for async sendResponse
  } else if (message.action === "getStatus") {
    chrome.storage.local.get(
      ["targetUrl", "lastFetchTime", "isEnabled", "fetchLogs"],
      (data) => {
        sendResponse({
          targetUrl: data.targetUrl,
          lastFetchTime: data.lastFetchTime,
          isEnabled: data.isEnabled,
          fetchLogs: data.fetchLogs || [],
        });
      }
    );
    return true; // Required for async sendResponse
  }
});

// Function to perform the fetch
async function performScheduledFetch() {
  // Check if fetching is enabled
  try {
    const { isEnabled, targetUrl } = await chrome.storage.local.get([
      "isEnabled",
      "targetUrl",
    ]);

    if (!isEnabled) {
      console.log("Scheduled fetch skipped: Fetching is disabled");
      return;
    }

    if (!targetUrl) {
      console.log("Scheduled fetch skipped: No target URL specified");
      return;
    }

    console.log(`Performing scheduled fetch to ${targetUrl}`);

    try {
      // Make the fetch request
      const response = await fetch(targetUrl, {
        method: "GET",
        mode: "no-cors", // This allows fetching from any origin
        cache: "no-store",
      });

      // Log the fetch time and status
      const fetchTime = new Date().toISOString();
      const logEntry = {
        time: fetchTime,
        url: targetUrl,
        status: "success",
      };

      // Get existing logs and add the new entry
      const { fetchLogs = [] } = await chrome.storage.local.get(["fetchLogs"]);
      const updatedLogs = [logEntry, ...fetchLogs].slice(0, 10); // Keep only the last 10 logs

      // Update storage
      await chrome.storage.local.set({
        lastFetchTime: fetchTime,
        fetchLogs: updatedLogs,
      });

      console.log(`Fetch completed successfully at ${fetchTime}`);
      return { success: true };
    } catch (error) {
      console.error("Error during fetch:", error);

      // Log the error
      const fetchTime = new Date().toISOString();
      const logEntry = {
        time: fetchTime,
        url: targetUrl,
        status: "error",
        error: error.message,
      };

      // Get existing logs and add the new entry
      const { fetchLogs = [] } = await chrome.storage.local.get(["fetchLogs"]);
      const updatedLogs = [logEntry, ...fetchLogs].slice(0, 10);

      // Update storage
      await chrome.storage.local.set({
        fetchLogs: updatedLogs,
      });

      throw error;
    }
  } catch (error) {
    console.error("Error in performScheduledFetch:", error);
  }
}
