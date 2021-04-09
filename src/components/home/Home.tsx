import React, {useState} from "react";
import './Home.scss';
import jumbo_background from '../../assets/home-background.png';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const jumbotron_height = 350;

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    jumboBackground: {
        height: jumbotron_height,
        backgroundImage: `url(${jumbo_background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
    }
}));

export default function Home() {
    const classes = useStyles();
    // const [response, setResponse] = useState({});
    // React.useEffect(() => {
    //     if (response == null || response == {}) {
    //         return;
    //     }
    //     fetch('https://lolstatic-a.akamaihd.net/riotbar/live/content-manifests/en_US.json')
    //         .then(r => r.json())
    //         .then(r => {
    //             setResponse(r)
    //             console.log(r)
    //         }).catch(e => console.error(e))
    // }, []);
    return (
        <div>
            <div className={`jumbotron rounded-0 p-0 ${classes.jumboBackground}`}>
                {/*<img src={jumbo_background} className={classes.jumboBackground} />*/}
            </div>
        </div>
    );
}