import React, {useLayoutEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import league_background from "../../assets/league-background.jpg";
import lolLogo from '../../assets/league-logo.png';
import {Card, Container, Jumbotron, Row} from "react-bootstrap";
import './LeagueOfLegends.scss';
import SimpleBar from "simplebar-react";
import borderImage from '../../assets/league-border.png';
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const {shell, ipcRenderer} = window.require('electron');
const request = require('request');

const jumbotron_height = 350;
const newsLang = "en-us";

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        jumboBackground: {
            height: jumbotron_height,
            backgroundImage: `url(${league_background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        },
        leagueBorder: {
            border: '10px solid transparent !important',
            padding: '15px !important',
            borderImage: `url(${borderImage}) 30 round !important`
        }
    }));

export default function LeagueOfLegends() {
    const classes = useStyles();
    const [lPatch, setLPatch] = useState(null);
    const [lUpdate, setLUpdate] = useState(null);
    const [lMedia, setLMedia] = useState(null);
    const [width, height] = useWindowSize();
    const [error, setError] = useState(null);

    React.useEffect(() => {
        fetchData();
    });

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
    };

    const launchLeague = () => {
        ipcRenderer.send('launch-league', null);
        ipcRenderer.on('launch-league-error', (event: any, args: any) => {
            setError(args);
        });
    };

    return (
        <div>
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
            <Jumbotron fluid className={`vertical-center rounded-0 p-0 unselectable ${classes.jumboBackground}`}>
                <Container>
                    <div className={"align-items-center w-100 d-flex justify-content-center"}>
                        <img id={"lol-logo"}
                             className={"unselectable m-0 p-0 align-middle d-flex justify-content-center"} src={lolLogo}
                             height={jumbotron_height * 0.7}/>
                    </div>
                    <div id={"start-lol-container"}>
                        <a onClick={() => {
                            launchLeague()
                        }} className="white unselectable">
                            <p>
                                <span className="bg"/>
                                <span className="base"/>
                                <span className="text league-font">Launch League</span>
                            </p>
                        </a>
                    </div>
                </Container>
            </Jumbotron>
            <SimpleBar style={{maxHeight: height - jumbotron_height}} autoHide={false} scrollbarMinSize={40}>
                <Container className={"mb-5"}>
                    <Row>
                        {[lUpdate, lPatch, lMedia].map((element: any) => {
                            if (!element)
                                return
                            return (
                                <div className={"col-6"}>
                                    <Card
                                        className={`${classes.leagueBorder} text-white mb-4 mr-4 mr-4 col-12 p-0 border-0 league-card`}>
                                        <Card.Img variant={"top"} className={"w-100 border-0 unselectable"}
                                                  src={element['imageUrl']}/>
                                        <Card.Body>
                                            <Card.Title>
                                                <Container className={"p-0 league-font"}>
                                                    <span>{element['title']}</span>
                                                </Container>
                                            </Card.Title>
                                            <Card.Subtitle
                                                className="mb-2 text-muted">{new Date(element['date']).toLocaleString(undefined).replaceAll(":00", "")}</Card.Subtitle>
                                            <Card.Text>
                                                {element['description']}
                                            </Card.Text>
                                            <h5>
                                                <button
                                                    onClick={() =>
                                                        shell.openExternal(
                                                            (element['link']['internal'] ?
                                                                'https://na.leagueoflegends.com/en-us/' : '')
                                                            + element['link']['url'])
                                                    }
                                                    className={"league-font league-button card-button left ml-2 unselectable"}
                                                >Read more
                                                </button>
                                            </h5>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                    </Row>
                </Container>
            </SimpleBar>
        </div>
    );
}