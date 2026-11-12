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
 * Applies or removes the attribute into the HTML DOM element
 *
 * @param {string} attribute
 * @param {boolean} value
 */
const setAttribute = function (attribute, value) {
  if (value) {
    htmlElement.setAttribute(`data-${attribute}`, "");
  } else {
    htmlElement.removeAttribute(`data-${attribute}`);
  }
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
    setAttribute(item, changes[item].newValue);
  }
};

/**
 * Gets the keys and values from sync storage of the chrome extension.
 *
 */
const setSettings = async function () {
  settings = await chrome.storage.sync.get(DEFAULTS);
  DEFAULTS.forEach((key) => {
    setAttribute(key, settings[key]);
  });
};

const init = function () {
  setSettings();
};

init();

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync") onStorageChange(changes);
});
