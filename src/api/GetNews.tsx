const request = require('request');
const newsLang = "en-us";

async function GetValorantNews() {
    let valorantNews:any = await GetAPI('https://playvalorant.com/page-data/' + newsLang + '/news/page-data.json');
    return valorantNews['result']['data']['contentstackNews']['featured_news']['reference'];
}

async function GetLeagueNews() {
    let resGameUpdates:any = await GetAPI('https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/'
        + newsLang + '/production/' + newsLang + '/page-data/news/game-updates/page-data.json');
    let resPathNotes:any = await GetAPI('https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/'
        + newsLang + '/production/' + newsLang + '/page-data/news/tags/patch-notes/page-data.json');
    let resMedia:any = await GetAPI('https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/'
        + newsLang + '/production/' + newsLang + '/page-data/news/media/page-data.json');
    let gameUpdates = resGameUpdates["result"]["pageContext"]["data"]["sections"][0]["props"]["articles"][0];
    let pathNotes = resPathNotes["result"]["pageContext"]["data"]["sections"][0]["props"]["articles"][0];
    let media = resMedia["result"]["pageContext"]["data"]["sections"][0]["props"]["articles"][0];
    return [gameUpdates, pathNotes, media];
}

function GetAPI(url: string) {
    return new Promise(function (resolve, reject) {
        request(url, {json: true}, function (error: any, res: any, body: any) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

export {
    GetValorantNews,
    GetLeagueNews
}
