import React, {useLayoutEffect, useState} from "react";
import './Home.scss';
import jumbo_background from '../../assets/home-background.png';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Row} from "react-bootstrap";
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import SimpleBar from "simplebar-react";
import LeaguePhoto from "../../assets/LeagueOfLegendsLaunch.jpg";
import ValorantPhoto from '../../assets/ValorantLaunch.jpg';

const {shell, ipcRenderer} = window.require('electron');
const request = require('request');

const jumbotron_height = 350;
const quickLaunchButtonHeight = 100;
const newsLang = "en-us";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        jumboBackground: {
            height: jumbotron_height,
            backgroundImage: `url(${jumbo_background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        },
        quickLaunchButton: {
            height: quickLaunchButtonHeight,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
        },
        leagueQuickLaunch: {
            backgroundImage: `url(${LeaguePhoto})`,
        },
        valorantLaunch: {
            backgroundImage: `url(${ValorantPhoto})`,
            backgroundSize: '125%'
        }
    }));

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default function Home() {
    const classes = useStyles();
    const [width, height] = useWindowSize();
    const [error, setError] = useState(null);
    const [lPatch, setLPatch] = useState(null);
    const [lUpdate, setLUpdate] = useState(null);
    const [lMedia, setLMedia] = useState(null);
    const [vNews, setVNews] = useState<null | any>(null);

    ipcRenderer.on('launch-league-error', (event: any, args: any) => {
        setError(args);
    });
    ipcRenderer.on('launch-valorant-error', (event: any, args: any) => {
        setError(args);
    });

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        if (!lUpdate) {
            request('https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/'
                + newsLang + '/production/' + newsLang + '/page-data/news/game-updates/page-data.json', {json: true},
                (err: any, res: any, body: any) => {
                    if (err) {
                        return console.log(err);
                    }
                    const latestUpdate = body["result"]["pageContext"]["data"]["sections"][0]["props"]["articles"][0];
                    setLUpdate(latestUpdate);
                    // setLNews([...lNews, latestUpdate]);
                });
        }
        if (!lPatch) {
            request('https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/'
                + newsLang + '/production/' + newsLang + '/page-data/news/tags/patch-notes/page-data.json', {json: true},
                (err: any, res: any, body: any) => {
                    if (err) {
                        return console.log(err);
                    }
                    const latestPatch = body["result"]["pageContext"]["data"]["sections"][0]["props"]["articles"][0];
                    setLPatch(latestPatch);
                });
        }
        if (!lMedia) {
            request(
                'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/'
                + newsLang + '/production/' + newsLang +
                '/page-data/news/media/page-data.json', {json: true}, (err: any, res: any, body: any) => {
                    if (err) {
                        return console.log(err);
                    }
                    const latestMedia = body["result"]["pageContext"]["data"]["sections"][0]["props"]["articles"][0];
                    setLMedia(latestMedia);
                });
        }
        if (!vNews) {
            request(
                'https://playvalorant.com/page-data/' + newsLang + '/news/page-data.json',
                {json: true}, (err: any, res: any, body: any) => {
                    if (err) {
                        return console.log(err);
                    }
                    try {
                        console.log(body['result']['data'])
                        // let news = [...body['result']['data']['contentstackNews']['featured_news']['reference']];
                        setVNews(body['result']['data']['contentstackNews']['featured_news']['reference']);

                    } catch (error) {
                        console.error(error);
                    }
                });
        }
    };

    return (
        <div className={"h-100"}>
            <Dialog
                open={error != null}
                onClose={() => setError(null)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Riot Client Services Path</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The path for Riot Client Services hasn't been configured to the correct
                        directory or the file doesn't exist anymore.
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <div className={`jumbotron rounded-0 p-0 ${classes.jumboBackground}`}>
            </div>
            <Row className={"col-12 h-100 m-0"}>
                <div className={"col-10 pl-0"}>

                </div>
                <div className={"col-2 p-0 h-100"} style={{minHeight: height - jumbotron_height}}>
                    <Button variant="contained"
                            className={`w-100 col-12 mb-3 ${classes.quickLaunchButton} ${classes.leagueQuickLaunch}`}
                            onClick={() => {
                                ipcRenderer.send('launch-league', null);
                            }}
                    />
                    <Button variant="contained"
                            className={`w-100 col-12 ${classes.quickLaunchButton} ${classes.valorantLaunch}`}
                            onClick={() => {
                                ipcRenderer.send('launch-valorant', null);
                            }}
                    />
                </div>
            </Row>
        </div>
    );
}