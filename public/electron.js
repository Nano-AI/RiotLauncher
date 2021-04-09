const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const child = require('child_process').execFile;

const valorantPath = "C:\\Riot Games\\Riot Client\\RiotClientServices.exe";
const valorantParamaters = ["--launch-product=valorant", "--launch-patchline=live"];
const valorantRunFile = "\"C:\\Riot Games\\Riot Client\\RiotClientServices.exe\" --launch-product=valorant --launch-patchline=live";

function createWindow () {
  const win = new BrowserWindow({
    width: 1440,
    height: 810,
    // resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
  });

  win.setMenuBarVisibility(false);

  win.loadURL(
      isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
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
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
});

ipcMain.on('launch-valorant', () => {
  child(valorantPath, valorantParamaters, (err, data) => {
    if (err)
      console.error(err)
    else
      console.log(data)
  });
});

