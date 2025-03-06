// Local const declaration to simulate the effect of a module
const Cooldown = {
  COOLDOWN_MINUTES: 5,

  async checkCooldown(fetchButton) {
    return new Promise((resolve) => {
      chrome.storage.local.get("lastFetchTime", (data) => {
        const lastFetchTime = data.lastFetchTime;
        if (lastFetchTime) {
          const now = Date.now();
          const elapsedMinutes = (now - lastFetchTime) / (1000 * 60);
          if (elapsedMinutes < Cooldown.COOLDOWN_MINUTES) {
            const remainingMinutes = Cooldown.COOLDOWN_MINUTES - elapsedMinutes;
            fetchButton.disabled = true;
            Utils.showStatus(
              `Please wait ${remainingMinutes.toFixed(
                1
              )} minutes before fetching again.`,
              "warning"
            );

            setTimeout(() => {
              fetchButton.disabled = false;
              Utils.showStatus("", "");
            }, remainingMinutes * 60 * 1000);

            resolve(false); // Cooldown active
          } else {
            resolve(true); // Cooldown expired
          }
        } else {
          resolve(true); // No previous fetch time
        }
      });
    });
  },

  async handleFetchClick() {
    const fetchButton = document.getElementById("fetchData");
    if (!(await Cooldown.checkCooldown(fetchButton))) {
      return; // Cooldown active
    }

    try {
      const API_ENDPOINT = "/api/submissions/";
      const PAGE_SIZE = 20;
      const MAX_PAGES = 10;

      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      Utils.showStatus("Loading...", "secondary");

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [API_ENDPOINT, PAGE_SIZE, MAX_PAGES],
        func: Fetch.fetchSubmissions,
      });

      Utils.showStatus(
        "Request loaded! Check the console for response data.",
        "success"
      );

      // Store the current time
      chrome.storage.local.set({ lastFetchTime: Date.now() });
    } catch (error) {
      console.error("Extension error:", error);
      Utils.showStatus(`Error: ${error.message}`, "error");
    }
  },
};
