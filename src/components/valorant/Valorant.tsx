import React, { useLayoutEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import valorant_background from '../../assets/valorant-background.jpg';
import { Card, Container, Jumbotron, Row } from 'react-bootstrap';
import './Valorant.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { GetValorantNews } from '../../api/GetNews';
import ValorantCard from '../valorant-card/ValorantCard';

const { shell, ipcRenderer } = window.require('electron');

const jumbotron_height = 350;

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
      backgroundImage: `url(${valorant_background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    },
  })
);

export default function Valorant() {
  const classes = useStyles();
  const [vNews, setVNews] = useState<null | any>(null);
  const [width, height] = useWindowSize();
  const [error, setError] = useState(null);

  React.useEffect(() => {
    async function getValorant() {
      const ValorantNews: any = await GetValorantNews();
      setVNews(ValorantNews);
    }
    if (!vNews) getValorant();
  }, []);

  const launchValorant = () => {
    ipcRenderer.send('launch-valorant', null);
    ipcRenderer.on('launch-valorant-error', (event: any, args: any) => {
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
      <Jumbotron fluid className={`vertical-center rounded-0 ${classes.jumboBackground}`}>
        <Container>
          <div className={'align-items-center w-100 d-flex justify-content-center'}>
            <h1
              className={'m-0 p-0 display-3 align-middle d-flex justify-content-center'}
              id={'valorant-logo'}
            >
              <svg viewBox="0 0 690 98.9">
                <path d="M615.11 19.15h24.69l.08 75.59c0 .97.79 1.77 1.77 1.77l14.14-.01c.98 0 1.77-.79 1.77-1.77l-.08-75.58h30.96c.91 0 1.43-1.06.85-1.77l-10.6-13.26a4.68 4.68 0 00-3.65-1.76h-59.93c-.98 0-1.77.79-1.77 1.77v13.26c0 .96.79 1.76 1.77 1.76M19.25 94.75L91.67 4.13c.57-.71.06-1.77-.85-1.77H72.71c-1.42 0-2.77.65-3.65 1.76L17.68 68.4V4.12c0-.98-.79-1.77-1.77-1.77H1.77C.79 2.35 0 3.14 0 4.12v90.62c0 .98.79 1.77 1.77 1.77H15.6c1.42 0 2.76-.65 3.65-1.76m51.06 0l24.91-31.17 24.91 31.17a4.685 4.685 0 003.66 1.76h13.83c.98 0 1.77-.79 1.77-1.77V4.12c0-.97-.79-1.77-1.77-1.77h-11.6c-2.84 0-5.53 1.29-7.31 3.51L47.69 94.73c-.57.71-.06 1.77.85 1.77h18.11c1.43.01 2.77-.64 3.66-1.75m51.39-66.21v41.75l-16.68-20.87 16.68-20.88zm404.37 66.19L453.65 4.11A4.68 4.68 0 00450 2.35h-13.84c-.98 0-1.77.79-1.77 1.77v90.62c0 .98.79 1.77 1.77 1.77h13.83c1.42 0 2.77-.65 3.65-1.76l24.91-31.17 24.91 31.17a4.68 4.68 0 003.65 1.76h18.11c.91 0 1.42-1.06.85-1.78m-57.33-45.31L452.05 70.3V28.54l16.69 20.88zM269.45 0c-27.3 0-49.43 22.13-49.43 49.43s22.13 49.43 49.43 49.43 49.43-22.13 49.43-49.43C318.89 22.13 296.75 0 269.45 0m0 82.06c-17.54 0-31.75-14.61-31.75-32.63 0-18.02 14.21-32.64 31.75-32.64S301.2 31.4 301.2 49.43c.01 18.02-14.21 32.63-31.75 32.63M583.38 4.12V68.4L532 4.11a4.68 4.68 0 00-3.65-1.76H514.5c-.97 0-1.77.79-1.77 1.77v43.67c0 1.06.36 2.09 1.03 2.92l14.71 18.41c.65.81 1.95.35 1.95-.68v-38l51.39 64.31a4.68 4.68 0 003.65 1.76h13.83c.98 0 1.77-.79 1.77-1.77V4.12c0-.97-.79-1.77-1.77-1.77h-14.14c-.98 0-1.77.8-1.77 1.77M410.62 23.76V4.12c0-.98-.79-1.77-1.77-1.77h-72.37c-.98 0-1.77.79-1.77 1.77v90.62c0 .98.79 1.77 1.77 1.77h14.14c.98 0 1.77-.79 1.77-1.77V19.16h40.55l-27.37 34.26c-.51.64-.51 1.56 0 2.21l31.27 39.13a4.68 4.68 0 003.65 1.76h18.11c.91 0 1.42-1.06.85-1.77l-32.14-40.21 22.28-27.84c.66-.85 1.03-1.88 1.03-2.94M162.39 96.51h41.96c1.42 0 2.77-.65 3.65-1.76l10.6-13.27c.57-.71.06-1.77-.85-1.77H178.3V4.12c0-.98-.79-1.77-1.77-1.77h-14.14c-.98 0-1.77.79-1.77 1.77v90.62c0 .97.8 1.77 1.77 1.77" />
              </svg>
            </h1>
          </div>
          <div id={'start-valorant-container'}>
            <a
              onClick={() => {
                launchValorant();
              }}
              className="white unselectable"
            >
              <p>
                <span className="bg" />
                <span className="base" />
                <span className="text valorant-font">Launch VALORANT</span>
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
            {vNews
              ? vNews!.map((element: any) => {
                  return (
                    <div className={'col-6'}>
                      <ValorantCard news={element} />
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
