const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow () {
  const win = new BrowserWindow({
    width: 1440,
    height: 810,
    resizable: false,
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
 /* const filter = {
    urls: ['*://!*.google.com/!*', '*://!*.playvalorant.com/!*']
  };

  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders['Origin'] = null;
    // details.headers['Origin'] = null;
    callback({ requestHeaders: details.requestHeaders })
  });*/
});

