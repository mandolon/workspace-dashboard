
const { app, BrowserWindow, autoUpdater } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    backgroundColor: '#fff',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  // Load your app's build (after running `vite build`)
  win.loadFile(path.join(__dirname, '../dist/index.html'));

  // Optional: Open DevTools in development
  // win.webContents.openDevTools();
}

// Set up auto-updates (UNCOMMENT & CONFIGURE after you set up your update server)
function setupAutoUpdater() {
  // Example for private distribution:
  // autoUpdater.setFeedURL({ url: "https://YOUR_DOMAIN_OR_UPDATE_SERVER_HERE" });
  // autoUpdater.checkForUpdatesAndNotify();

  // autoUpdater.on('update-downloaded', () => {
  //   autoUpdater.quitAndInstall();
  // });
}

app.whenReady().then(() => {
  createWindow();
  setupAutoUpdater();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
