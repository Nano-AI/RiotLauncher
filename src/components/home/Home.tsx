import React, {useLayoutEffect, useState} from "react";
import './Home.scss';
import jumbo_background from '../../assets/home-background.png';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Row} from "react-bootstrap";
import {Button} from "@material-ui/core";
import SimpleBar from "simplebar-react";
import LeaguePhoto from "../../assets/LeagueOfLegendsLaunch.jpg";

const jumbotron_height = 350;
const quickLaunchButtonHeight = 100;

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
        height: quickLaunchButtonHeight
    },
    leagueQuickLaunch: {
        backgroundImage: `url(${LeaguePhoto})`,
        backgroundSize:     'cover',
        backgroundRepeat:   'no-repeat',
        backgroundPosition: 'center center',
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

    return (
        <div className={"h-100"}>
            <div className={`jumbotron rounded-0 p-0 ${classes.jumboBackground}`}>
            </div>
            <Row className={"col-12 h-100 m-0"}>
                <div className={"col-10 pl-0"}>

                </div>
                <div className={"col-2 p-0 h-100"} style={{ minHeight: height - jumbotron_height }}>
                    <Button variant="contained" className={`w-100 col-12 mb-3 ${classes.quickLaunchButton} ${classes.leagueQuickLaunch}`} />
                    <Button variant="contained" className={`w-100 col-12 ${classes.quickLaunchButton}`} />
                </div>
            </Row>
        </div>
    );
}