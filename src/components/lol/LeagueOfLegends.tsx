import React, { useLayoutEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import league_background from '../../assets/league-background.jpg';
import lolLogo from '../../assets/league-logo.png';
import { Card, Container, Jumbotron, Row } from 'react-bootstrap';
import './LeagueOfLegends.scss';
import SimpleBar from 'simplebar-react';
import borderImage from '../../assets/league-border.png';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { GetLeagueNews } from '../../api/GetNews';
import LeagueCard from '../league-card/LeagueCard';

const { shell, ipcRenderer } = window.require('electron');
const request = require('request');

const jumbotron_height = 350;
const newsLang = 'en-us';

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
      backgroundPosition: 'center center',
    },
    leagueBorder: {
      border: '10px solid transparent !important',
      padding: '15px !important',
      borderImage: `url(${borderImage}) 30 round !important`,
    },
  })
);

export default function LeagueOfLegends() {
  const classes = useStyles();
  const [leagueNews, setLeagueNews] = useState<null | any>(null);
  const [width, height] = useWindowSize();
  const [error, setError] = useState(null);

  React.useEffect(() => {
    async function getLeague() {
      const LeagueNews: any = await GetLeagueNews();
      setLeagueNews(LeagueNews);
    }
    if (!leagueNews) getLeague();
  });

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
            The path for Riot Client Services hasn't been configured to the correct directory or the
            file doesn't exist anymore.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Jumbotron
        fluid
        className={`vertical-center rounded-0 p-0 unselectable ${classes.jumboBackground}`}
      >
        <Container>
          <div className={'align-items-center w-100 d-flex justify-content-center'}>
            <img
              id={'lol-logo'}
              className={'unselectable m-0 p-0 align-middle d-flex justify-content-center'}
              src={lolLogo}
              height={jumbotron_height * 0.7}
            />
          </div>
          <div id={'start-lol-container'}>
            <a
              onClick={() => {
                launchLeague();
              }}
              className="white unselectable"
            >
              <p>
                <span className="bg" />
                <span className="base" />
                <span className="text league-font">Launch League</span>
              </p>
            </a>
          </div>
        </Container>
      </Jumbotron>
      <SimpleBar
        style={{ maxHeight: height - jumbotron_height }}
        autoHide={false}
        scrollbarMinSize={40}
      >
        <Container className={'mb-5'}>
          <Row>
            {leagueNews
              ? leagueNews!.map((element: any) => {
                  if (!element) return;
                  return (
                    <div className={'col-6'}>
                      <LeagueCard news={element} />
                    </div>
                  );
                })
              : ''}
          </Row>
        </Container>
      </SimpleBar>
    </div>
  );
}
