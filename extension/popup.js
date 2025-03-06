document.addEventListener("DOMContentLoaded", async () => {
  const fetchButton = document.getElementById("fetchData");
  const mainContent = document.getElementById("mainContent");
  const LEETCODE_DOMAIN = "leetcode.com";

  // Disable button if not on LeetCode
  const isLeetCodeDomain = (await Utils.getActiveTabUrl()).includes(
    LEETCODE_DOMAIN
  );
  if (!isLeetCodeDomain) {
    mainContent.style.display = "none";
    Utils.showStatus("This extension only works on LeetCode.", "error");
    return;
  }

  fetchButton.addEventListener("click", Cooldown.handleFetchClick);

  // Initial check on popup open
  if (
    !(await Cooldown.checkCooldown(() => {
      fetchButton.disabled = false;
      Utils.showStatus("", "");
    }))
  ) {
    fetchButton.disabled = true;
    const remainingMinutes = 999; // TODO: implement a "get minutes left" thing from chrome extneion storage
    Utils.showStatus(
      `Please wait ${remainingMinutes.toFixed(
        1
      )} minutes before fetching again.`,
      "warning"
    );
  }
});
