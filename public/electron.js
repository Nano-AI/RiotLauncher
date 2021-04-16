const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const child = require('child_process').execFile;
const storage = require('electron-json-storage');
const request = require('request');

const githubReleaseAPI = 'https://api.github.com/repos/Nano-AI/RiotLauncher/releases/latest';

const valorantParamaters = ['--launch-product=valorant', '--launch-patchline=live'];

const leagueParamaters = ['--launch-product=league_of_legends', '--launch-patchline=live'];

var latestRelease = null;

function GetAPI(url) {
  return new Promise(function (resolve, reject) {
    request(
      url,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'MY-UA-STRING',
        },
        json: true,
      },
      function (error, res, body) {
        if (!error && res.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      }
    );
  });
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 810,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    icon: __dirname + '/logo.png',
  });

  win.setMenuBarVisibility(false);
  storage.get('settings', async (error, data) => {
    if (!data) {
      storage.set(
        'settings',
        { riot_client_services_path: 'C:\\Riot Games\\Riot Client\\RiotClientServices.exe' },
        error => {
          if (error) throw error;
        }
      );
    }
  });

  win.loadURL(
    !app.isPackaged
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('launch-valorant', (event, args) => {
  storage.get('settings', function (error, data) {
    if (error) throw error;
    child(data.riot_client_services_path, valorantParamaters, (err, data) => {
      if (err) {
        event.reply('launch-valorant-error', err);
      } else console.log(data);
    });
  });
});

ipcMain.on('launch-league', (event, args) => {
  storage.get('settings', function (error, data) {
    if (error) throw error;
    // const random = 'D:\\Riot Games\\Riot Client\\RiotClientServices.exe';
    // child(random, leagueParamaters, (err, data) => {
    child(data.riot_client_services_path, leagueParamaters, (err, data) => {
      if (err) {
        event.reply('launch-league-error', err);
      } else console.log(data);
    });
  });
});

ipcMain.on('get-update', async (event, args) => {
  let githubAPI = latestRelease;
  if (!latestRelease) {
    githubAPI = await GetAPI(githubReleaseAPI).catch(e => console.error(e));
    latestRelease = githubAPI;
  }
  if (
    githubAPI['tag_name'] === 'v' + app.getVersion() ||
    githubAPI['tag_name'] === app.getVersion()
  )
    return;
  event.reply('get-update', githubAPI);
});

ipcMain.on('update-client', (event, args) => {
  shell.openExternal(args['assets'][0]['browser_download_url']);
});
