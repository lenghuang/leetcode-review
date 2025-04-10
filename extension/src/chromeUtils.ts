/**
 * Creates a new tab in the specified window.
 * @param windowId The ID of the window.
 * @param url The URL to open in the new tab.
 */
export const createTabInWindow = (windowId: number, url: string) => {
  chrome.tabs
    .create({
      windowId: windowId,
      url: url,
      active: false,
    })
    .then((tab) => {
      console.log(`Created Tab for ${url}: Result`, tab);
    });
};
