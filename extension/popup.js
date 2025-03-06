document.addEventListener("DOMContentLoaded", async () => {
  const fetchButton = document.getElementById("fetchData");
  const mainContent = document.getElementById("mainContent");
  const LEETCODE_DOMAIN = "leetcode.com";

  // Disable button if not on LeetCode
  const isLeetCodeDomain = (await Utils.getActiveTabUrl()).includes(
    LEETCODE_DOMAIN
  );
  if (!isLeetCodeDomain) {
    fetchButton.disabled = true;
    mainContent.style.display = "none";
    Utils.showStatus("This extension only works on LeetCode.", "error");
    return;
  }

  fetchButton.addEventListener("click", Cooldown.handleFetchClick);

  // Initial check on popup open
  await Cooldown.checkCooldown(fetchButton);
});
