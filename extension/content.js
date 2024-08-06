window.addEventListener('load', async () => {
    const response = await chrome.runtime.sendMessage({ message: 'completed window loading' });
});