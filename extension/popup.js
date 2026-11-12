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

const container = document.querySelector(".container");
let checkboxes;

const setChecks = async function () {
  const settings = await chrome.storage.sync.get(DEFAULTS);
  checkboxes.forEach((element) => {
    const key = element.getAttribute("id");
    if (settings[key]) {
      element.checked = true;
    }
  });
};

const init = function () {
  checkboxes = document.querySelectorAll('input[type="checkbox"]');
};

init();

container.addEventListener("click", function (e) {
  const input = e.target;
  if (input.localName !== "input") return;
  const key = input.getAttribute("id");
  const value = input.checked;

  chrome.storage.sync.set({ [key]: value }).then(() => {
    console.log(`Key: ${key}, set with a value of ${value}`);
  });
});

document.addEventListener("DOMContentLoaded", function (e) {
  setChecks();
});
