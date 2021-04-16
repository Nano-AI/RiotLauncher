import request from 'request';

const lang = 'en-us';
const valorantEndpoint = `https://playvalorant.com/page-data/${lang}`;
const leaugeEndpoint = `https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/${lang}/production/${lang}/page-data/news`;

export async function GetValorantNews() {
  const res = await fetchAPI(valorantEndpoint + '/news/page-data.json');
  return res.result.data.contentstackNews.featured_news.reference;
}

export async function GetLeagueNews() {
  const parseData = (data: any) => data.result.pageContext.data.sections[0].props.articles[0];

  const updates = await fetchAPI(leaugeEndpoint + '/game-updates/page-data.json');
  const patchNotes = await fetchAPI(leaugeEndpoint + '/tags/patch-notes/page-data.json');
  const media = await fetchAPI(leaugeEndpoint + '/media/page-data.json');
  return [parseData(updates), parseData(patchNotes), parseData(media)];
}

function fetchAPI(url: string): any {
  return new Promise(function (resolve, reject) {
    request(url, { json: true }, (error, res, body) => {
      // statusCode could be not 200 while no error, caused by an api error, not connection
      if (!error && res.statusCode === 200) resolve(body);
      else reject(error);
    });
  });
}
