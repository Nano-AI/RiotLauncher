const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const child = require("child_process").execFile;
const isDev = require("electron-is-dev");

const riotClientServicesPath = "C:\\Riot Games\\Riot Client\\RiotClientServices.exe";
const valorantParamaters = [
  "--launch-product=valorant",
  "--launch-patchline=live",
];
const leagueParamaters = [
  "--launch-product=league_of_legends",
  "--launch-patchline=live"
];

function createWindow() {
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

ipcMain.on("launch-valorant", () => {
  child(riotClientServicesPath, valorantParamaters, (err, data) => {
    if (err) console.error(err);
    else console.log(data);
  });
});

ipcMain.on("launch-league", () => {
  child(riotClientServicesPath, leagueParamaters, (err, data) => {
    if (err) console.error(err);
    else console.log(data);
  })
});
