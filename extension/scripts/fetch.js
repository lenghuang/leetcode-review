// Local const declaration to simulate the effect of a module
const Fetch = {
  async fetchSubmissions(endpoint, pageSize, maxPages) {
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

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Avoid rate limiting
      } catch (error) {
        console.error("Fetch error:", error);
        break;
      }
    }
  },
};
