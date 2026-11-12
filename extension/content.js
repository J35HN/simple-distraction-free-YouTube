const DEFAULTS = [
  "hide-shorts",
  "hide-people-searched",
  "hide-chips",
  "hide-sponsors",
  "hide-comments",
  "hide-video-actions",
  "hide-secondary",
  "hide-posts",
  "hide-banner",
  "hide-main-video",
  "hide-video-data",
  "hide-search-predictions",
];

const htmlElement = document.querySelector("html");
let settings;

/**
 * Applies the attributes on the HTML DOM element.
 *
 * @param {Object} settings - Object that contains the keys of attributes.
 */
const applyAttributes = function (settings) {
  DEFAULTS.forEach((key) => {
    if (settings[key]) {
      htmlElement.setAttribute(`data-${key}`, "");
    } else {
      htmlElement.removeAttribute(`data-${key}`);
    }
  });
};

/**
 * Applies or removes an attribute of the HTML DOM element.
 *
 * @param {Object} changes - Object that describes the changes.
 */
const onStorageChange = function (changes) {
  // changedItems is just one change.
  const changedItems = Object.keys(changes);
  for (const item of changedItems) {
    if (changes[item].newValue === true) {
      htmlElement.setAttribute(`data-${item}`, "");
    } else {
      htmlElement.removeAttribute(`data-${item}`);
    }
  }
};

/**
 * Gets the keys and values from sync storage of the chrome extension.
 *
 */
const getSettings = async function () {
  settings = await chrome.storage.sync.get(DEFAULTS);
  applyAttributes(settings);
};

const init = function () {
  getSettings();
};

init();

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync") onStorageChange(changes);
});
