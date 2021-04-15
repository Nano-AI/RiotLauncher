import React, {useLayoutEffect, useState} from "react";
import './Home.scss';
import jumbo_background from '../../assets/home-background.png';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Container, Row} from "react-bootstrap";
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import SimpleBar from "simplebar-react";
import LeaguePhoto from "../../assets/LeagueOfLegendsLaunch.jpg";
import ValorantPhoto from '../../assets/ValorantLaunch.jpg';
import LeagueCard from "../league-card/LeagueCard";
import {GetLeagueNews, GetValorantNews} from "../../api/GetNews";
import ValorantCard from "../valorant-card/ValorantCard";

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
    const [leagueNews, setLeagueNews] = useState<null | any>(null);
    const [valorantNews, setValorantNews] = useState<null | any>(null);

    ipcRenderer.on('launch-league-error', (event: any, args: any) => {
        setError(args);
    });
    ipcRenderer.on('launch-valorant-error', (event: any, args: any) => {
        setError(args);
    });

    React.useEffect(() => {
        async function getLeague() {
            if (!leagueNews) {
                const LeagueNews: any = await GetLeagueNews();
                setLeagueNews(LeagueNews);
            }
        }

        async function getValorant() {
            if (!valorantNews) {
                const ValorantNews: any = await GetValorantNews();
                setValorantNews(ValorantNews);
            }
        }

        if (!leagueNews) {
            getLeague();
            getValorant();
        }
    }, []);

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
                    <SimpleBar style={{maxHeight: height - jumbotron_height}} autoHide={false} scrollbarMinSize={40}>
                        <Container className={"mb-5"}>
                            {/*<h4>League of Legends News</h4>*/}
                            <Row>
                                {valorantNews ? valorantNews!.map((element: any) => {
                                    if (!element)
                                        return
                                    return (
                                        <div className={"col-4"}>
                                            <ValorantCard news={element}/>
                                        </div>
                                    );
                                }) : ''}
                                {leagueNews ? leagueNews!.map((element: any) => {
                                    if (!element)
                                        return
                                    return (
                                        <div className={"col-4"}>
                                            <LeagueCard news={element}/>
                                        </div>
                                    );
                                }) : ''}
                            </Row>
                        </Container>
                    </SimpleBar>
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