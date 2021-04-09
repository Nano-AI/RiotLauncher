import React, {useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import valorant_background from "../../assets/valorant-background.jpg";

const jumbotron_height = 350;

const newsLang = "en-us";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        jumboBackground: {
            height: jumbotron_height,
            backgroundImage: `url(${valorant_background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        }
    }));

export default function Valorant() {
    const classes = useStyles();
    // const [vNews, setVNews] = useState(null);
    //
    // React.useEffect(() => {
    //     fetch('https://playvalorant.com/page-data/' + newsLang + '/news/page-data.json')
    //         .then(r => r.json())
    //         .then(d => {
    //             console.log(d)
    //             setVNews(d)
    //         });
    // }, []);

    return (
        <div>
            <div className={`jumbotron rounded-0 p-0 ${classes.jumboBackground}`}>
                {/*<img src={jumbo_background} className={classes.jumboBackground} />*/}
            </div>
        </div>
    );
}
