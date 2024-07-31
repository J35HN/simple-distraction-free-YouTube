const videos_link = 'https://www.youtube.com/watch?v=';
const youtube_home_link = 'https://www.youtube.com/';

chrome.runtime.onInstalled.addListener( () => {
    chrome.action.setBadgeText({
        text: 'ON',
    })
})

chrome.action.onClicked.addListener( async ( tab ) => {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = ( prevState === 'ON' ) ? 'OFF' : 'ON';

    await chrome.action.setBadgeText({
        text: nextState,
    });
});

chrome.tabs.onUpdated.addListener( async ( tabId, changeInfo, tab ) => {
    if ( changeInfo.url )
    {
        const currentState = await chrome.action.getBadgeText({ tabId })
        console.log('state: ', currentState);
        if ( changeInfo.url == youtube_home_link )
        {
            console.log('on YouTube home');
        }

        if ( tab.url.startsWith( videos_link ) )
        {
            console.log( changeInfo.url );
            console.log('on a YouTube video');
        }
    }
});