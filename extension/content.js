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

const applyAttributes = function (settings) {
  DEFAULTS.forEach((key) => {
    if (settings[key]) {
      htmlElement.setAttribute(`data-${key}`, "");
    } else {
      htmlElement.removeAttribute(`data-${key}`);
    }
  });
};

const getSettings = async function () {
  settings = await chrome.storage.sync.get(DEFAULTS);
  applyAttributes(settings);
};

const init = function () {
  getSettings();
};

init();
