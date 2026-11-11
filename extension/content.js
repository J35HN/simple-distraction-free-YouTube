const DEFAULTS = [
  "hide-shorts",
  "hide-people-searched",
  "hide-chips",
  "hide-comments",
  "hide-video-actions",
  "hide-secondary-column",
  "hide-posts",
  "hide-banner",
  "hide-main-video",
  "hide-video-data",
  "hide-search-predictions",
];

let settings;

const getSettings = async function () {
  settings = await chrome.storage.sync.get(DEFAULTS);
  console.log(settings);
};

const init = function () {
  getSettings();
};

init();
