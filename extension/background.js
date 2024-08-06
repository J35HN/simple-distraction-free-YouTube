const videos_link = 'https://www.youtube.com/watch?v=';
const youtube_home_link = 'https://www.youtube.com/';

async function removeVideoCSS( tabId ) {
    await chrome.scripting.removeCSS({
        files: ['css/video.css'],
        target: { tabId: tabId },
    });
}

async function removeHomeCSS( tabId ) {
    await chrome.scripting.removeCSS({
        files: ['css/home.css'],
        target: { tabId: tabId },
    });
}

async function cssInsertion(tabId) {
    const currentState = await chrome.action.getBadgeText( {tabId: tabId });
    if (currentState === 'ON') {
        await chrome.scripting.insertCSS({
            files: ['css/video.css'],
            target: { tabId: tabId },
        });

        await chrome.scripting.insertCSS({
            files: ['css/home.css'],
            target: { tabId: tabId },
        });
    }
}

chrome.runtime.onInstalled.addListener( () => {
    chrome.action.setBadgeText({
        text: 'ON',
    })
})

chrome.action.onClicked.addListener( async ( tab ) => {
    const prevState = await chrome.action.getBadgeText( {tabId: tab.id} );
    const nextState = (prevState === 'ON') ? 'OFF' : 'ON';
    
    await chrome.action.setBadgeText({
        text: nextState,
        tabId: tab.id,
    });
    
    if (tab.url.startsWith(youtube_home_link) && nextState === 'ON') {
        await chrome.scripting.insertCSS({
            files: ['css/video.css'],
            target: { tabId: tab.id },
        });

        await chrome.scripting.insertCSS({
            files: ['css/home.css'],
            target: { tabId: tab.id },
        });
    } else if (tab.url.startsWith(youtube_home_link) && nextState === 'OFF') {
        await chrome.scripting.removeCSS({
            files: ['css/video.css'],
            target: { tabId: tab.id },
        });

        await chrome.scripting.removeCSS({
            files: ['css/home.css'],
            target: { tabId: tab.id },
        });
    }
});

chrome.runtime.onMessage.addListener( ( request, sender, sendResponse ) => {
    removeVideoCSS(sender.tab.id);
    removeHomeCSS(sender.tab.id);
    if ( request.message === 'completed window loading' &&
        sender.tab.url.startsWith(youtube_home_link) ){
            console.log('a youtube link finished loading');
            cssInsertion(sender.tab.id);
        }
    });