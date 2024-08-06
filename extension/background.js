const videos_link = 'https://www.youtube.com/watch?v=';
const youtube_home_link = 'https://www.youtube.com/';

chrome.runtime.onInstalled.addListener( () => {
    chrome.action.setBadgeText({
        text: 'OFF',
    })
})

chrome.action.onClicked.addListener( async ( tab ) => {
    const prevState = await chrome.action.getBadgeText( {tabId: tab.id} );
    const nextState = (prevState === 'ON') ? 'OFF' : 'ON';

    await chrome.action.setBadgeText({
        text: nextState,
    });

    if (tab.url.startsWith(videos_link) && nextState === 'ON') {
        await chrome.scripting.insertCSS({
            files: ['css/video.css'],
            target: { tabId: tab.id },
        });
    } else if (tab.url.startsWith(videos_link) && nextState === 'OFF') {
        await chrome.scripting.removeCSS({
            files: ['css/video.css'],
            target: { tabId: tab.id },
        })
    }
});

chrome.runtime.onMessage.addListener( ( request, sender, sendResponse ) => {
    if (request.message === 'completed window loading' &&
        sender.tab.url.startsWith(youtube_home_link)
    ){
        console.log('a youtube link finished loading');
    }
});