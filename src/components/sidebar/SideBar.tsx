import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import riot_logo from "../../assets/white-riot-logo.svg";
import {HashRouter, NavLink} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './SideBar.scss';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: "rgb(14, 14, 14)",
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
        riotLogo: {

        }
    }),
);

export default function SideBar() {
    const classes = useStyles();
    return (
        <div className={`${classes.root} unselectable`}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <img src={riot_logo} className={'mb-5 ml-5 mt-5 mr-5 no-antialising'}  alt={"The Riot Games logo"}/>
                <div className={'mt-4 ml-5 text-white'}>
                    <HashRouter>
                        <h6 className={"mb-5"}><NavLink exact className={"no-url"} to={"/"}>Home</NavLink></h6>
                        <h6 className={"mb-5"}><NavLink className={"no-url"} to={"/valorant"}>VALORANT</NavLink></h6>
                        <h6 className={"mb-5"}><NavLink className={"no-url"} to={"/lol"}>League of Legends</NavLink></h6>
                        {/*<h6 className={"mb-5"}>Teamfight Tactics</h6>*/}
                        {/*<h6 className={"mb-5"}>Legends of Runeterra</h6>*/}
                    </HashRouter>
                </div>
            </Drawer>
        </div>
    );
}
