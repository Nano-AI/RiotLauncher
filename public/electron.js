const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const child = require("child_process").execFile;
const isDev = require("electron-is-dev");
const storage = require('electron-json-storage');

const valorantParamaters = [
  "--launch-product=valorant",
  "--launch-patchline=live",
];

const leagueParamaters = [
  "--launch-product=league_of_legends",
  "--launch-patchline=live"
];

async function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 810,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    icon: __dirname + '/logo.png'
  });

  win.setMenuBarVisibility(false);
  // const drives = await drivelist.list();
  storage.get('settings', async (error, data) => {
    if (!data) {
      storage.set('settings', {riot_client_services_path: 'C:\\Riot Games\\Riot Client\\RiotClientServices.exe'}, (error) => {
        if (error) throw error;
      });
    }
  });

  win.loadURL(
      isDev
          ? "http://localhost:3000"
          : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("launch-valorant", (event, args) => {
  storage.get('settings', function (error, data) {
    if (error) throw error;
    child(data.riot_client_services_path, valorantParamaters, (err, data) => {
      if (err) {
        event.reply('launch-valorant-error', err);
      } else console.log(data);
    });
  });
});

ipcMain.on("launch-league", (event, args) => {
  storage.get('settings', function (error, data) {
    if (error) throw error;
    child(data.riot_client_services_path, leagueParamaters, (err, data) => {
      if (err) {
        event.reply('launch-league-error', err);
      } else console.log(data);
    })
  });
});
