import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Settings.scss';
import { Button } from '@material-ui/core';

const storage = window.require('electron-json-storage');
const { remote } = window.require('electron');

export default function Settings() {
  const [path, setPath] = useState(null);

  if (!path) {
    storage.get('settings', function (error: any, data: any) {
      if (error) throw error;
      setPath(data['riot_client_services_path']);
    });
  }

  const saveSettings = () => {
    storage.set('settings', { riot_client_services_path: path }, function (error: any) {
      if (error) throw error;
    });
  };

  const cancelSettings = () => {
    storage.get('settings', (error: any, data: any) => {
      setPath(data['riot_client_services_path']);
    });
  };

  return (
    <div>
      <Container className={'mt-5 unselectable'}>
        <form noValidate autoComplete="off">
          <h3>Path Settings</h3>
          <p className={'h5 font-weight-normal'}>Riot Client Services Path</p>
          <Form.File id="formcheck-api-custom" custom>
            <Form.File.Input
              accept={'.exe'}
              onChange={(file: any) => {
                if (file.target.files.length !== 0) setPath(file.target.files[0].path);
              }}
            />
            <Form.File.Label data-browse="Browse">{path}</Form.File.Label>
          </Form.File>
        </form>
        <div id={'version-text'}>
          <p>
            Version Number: {remote.app.getVersion()}
            <p className={'text-muted'}>Local data is stored at {storage.getDataPath()}</p>
          </p>
        </div>
        <div className={'m-4'} id={'save-button'}>
          <NavLink onMouseDown={e => e.preventDefault()} className={'no-url'} to={'/'} exact>
            <Button variant="contained" className={'mr-3'} onClick={cancelSettings}>
              Cancel
            </Button>
          </NavLink>
          <Button variant="contained" color={'primary'} onClick={saveSettings}>
            Save
          </Button>
        </div>
        <br />
      </Container>
    </div>
  );
}
