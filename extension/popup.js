const container = document.querySelector(".container");

container.addEventListener("click", function (e) {
  const input = e.target;
  if (input.localName !== "input") return;
  const key = input.getAttribute("id");
  const value = input.checked;

  chrome.storage.sync.set({ [key]: value }).then(() => {
    console.log(`Key: ${key}, set with a value of ${value}`);
  });
});
