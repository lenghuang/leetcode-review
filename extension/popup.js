document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetchData");
  const endpointInput = document.getElementById("endpoint");
  const statusDiv = document.getElementById("status");

  fetchButton.addEventListener("click", async () => {
    // Get the endpoint from the input
    const endpoint = endpointInput.value.trim();

    if (!endpoint) {
      showStatus("Please enter an API endpoint", "error");
      return;
    }

    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      // Execute script in the context of the page
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [endpoint],
        func: fetchDataFromPage,
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

// This function runs in the context of the web page
function fetchDataFromPage(endpoint) {
  console.log(`Fetching data from: ${endpoint}`);

  // Determine the full URL (handle both absolute and relative paths)
  let url = endpoint;
  if (endpoint.startsWith("/")) {
    url = `${window.location.origin}${endpoint}`;
  } else if (!endpoint.startsWith("http")) {
    url = `${window.location.origin}/${endpoint}`;
  }

  // Make the fetch request with credentials to include cookies
  fetch(url, {
    method: "GET",
    credentials: "same-origin", // Include cookies for same-origin requests
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json().then((data) => {
          console.log("Response data:", data);
          return { success: true, data };
        });
      } else {
        return response.text().then((text) => {
          console.log("Response text:", text);
          return { success: true, text };
        });
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      return { success: false, error: error.message };
    });
}
