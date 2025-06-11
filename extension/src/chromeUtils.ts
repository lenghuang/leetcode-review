/**
 * Creates a new tab in the specified window.
 * @param windowId The ID of the window.
 * @param url The URL to open in the new tab.
 */
export const createTabInWindow = async (
  windowId: number,
  url: string
): Promise<chrome.tabs.Tab> => {
  const tab = await chrome.tabs.create({
    windowId: windowId,
    url: url,
    active: false,
  });
  console.log(`Created Tab for ${url}: Result`, tab);
  return tab;
};
