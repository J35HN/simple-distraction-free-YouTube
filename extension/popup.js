const hideShortsBtn = document.querySelector("#hide-shorts");

hideShortsBtn.addEventListener("click", function (e) {
  const btn = e.currentTarget;
  chrome.storage.sync.set({ shorts: btn.checked }).then(() => {
    console.log(`Value set to ${btn.checked}`);
  });

  chrome.storage.sync.get(["shorts"]).then((result) => {
    console.log("Value currently is " + result.shorts);
  });
});
