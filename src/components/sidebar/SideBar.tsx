import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import riot_logo from '../../assets/white-riot-logo.svg';
import { HashRouter, NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './SideBar.scss';

import LeagueLogo from '../../assets/LeagueLogo.png';
import ValorantLogo from '../../assets/ValorantLogo.png';
import HomeLogo from '../../assets/Home.svg';
import GearCog from '../../assets/Gear.svg';

const drawerWidth = 240;
const iconHeight = 25;

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
      backgroundColor: 'rgb(14, 14, 14)',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    riotLogo: {},
  })
);

export default function SideBar() {
  const classes = useStyles();
  return (
    <div className={`${classes.root} unselectable`}>
      <CssBaseline />
      <Drawer
        className={`${classes.drawer} position-relative`}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <img
          src={riot_logo}
          className={'unselectable mb-5 ml-5 mt-5 mr-5 no-antialising'}
          alt={'The Riot Games logo'}
        />
        <div className={'mt-4 ml-4 text-white'}>
          <HashRouter>
            <h6 className={'unselectable mb-5'}>
              <NavLink onMouseDown={e => e.preventDefault()} exact className={'no-url'} to={'/'}>
                <img
                  className={'align-middle mr-3 white-logo center-image'}
                  src={HomeLogo}
                  height={iconHeight}
                  alt="Home Logo"
                />
                Home
              </NavLink>
            </h6>
            <h6 className={'unselectable mb-5'}>
              <NavLink onMouseDown={e => e.preventDefault()} className={'no-url'} to={'/valorant'}>
                <img
                  className={'align-middle mr-3 center-image'}
                  src={ValorantLogo}
                  height={iconHeight}
                  alt="Valorant Logo"
                />
                VALORANT
              </NavLink>
            </h6>
            <h6 className={'unselectable mb-5'}>
              <NavLink onMouseDown={e => e.preventDefault()} className={'no-url'} to={'/lol'}>
                <img
                  className={'align-middle mr-3 center-image'}
                  src={LeagueLogo}
                  height={iconHeight}
                  alt="Leauge Logo"
                />
                League of Legends
              </NavLink>
            </h6>
            <div className="bottom-left text-white ml-4 mb-4" id={'settings-div'}>
              <h5>
                <NavLink
                  onMouseDown={e => e.preventDefault()}
                  className={'no-url'}
                  to={'/settings'}
                >
                  <img src={GearCog} className={'align-middle pr-2 white-logo'} alt="Gear Icon" />
                  Settings
                </NavLink>
              </h5>
            </div>
            {/*<h6 className={"mb-5"}>Teamfight Tactics</h6>*/}
            {/*<h6 className={"mb-5"}>Legends of Runeterra</h6>*/}
          </HashRouter>
        </div>
      </Drawer>
    </div>
  );
}
