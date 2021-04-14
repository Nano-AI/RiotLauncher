import React from 'react';
import './App.scss';
import SideBar from "./components/sidebar/SideBar";
import { HashRouter, Route } from 'react-router-dom';
import Home from "./components/home/Home";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Valorant from "./components/valorant/Valorant";
import LeagueOfLegends from "./components/lol/LeagueOfLegends";
import 'bootstrap/dist/css/bootstrap.min.css';
import Settings from "./components/settings/Settings";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            marginLeft: drawerWidth,
            flexGrow: 1,
            padding: theme.spacing(3),
            color: 'white'
        },
    }),
);

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <header className="App-header">
                <SideBar />
            </header>
            <main className={`${classes.content} p-0`}>
                <HashRouter>
                    <Route exact path={'/'} component={Home} />
                    <Route path={'/valorant'} component={Valorant} />
                    <Route path={'/lol'} component={LeagueOfLegends} />
                    <Route path={'/settings'} component={Settings} />
                </HashRouter>
                {/*<Route path={'/'} component={TeamfightTactics} />*/}
                {/*<Route path={'/'} component={LegendsOfRuneterra} />*/}
            {/*</div>*/}
            </main>
        </div>
    );
}

export default App;
