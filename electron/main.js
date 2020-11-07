// import { app, BrowserWindow, screen } from 'electron';
// import path from 'path';

const { app, BrowserWindow } = require('electron');
const _screen = require('electron').screen;
const path = require('path');

let mainWindow;
let presentationWindow;

function createMainWindow ({ x, y }) {
  mainWindow = new BrowserWindow({
    x, 
    y,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.maximize();
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000/MainScreen');
  }

  mainWindow.show();

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function createPresentationWindow ({ x, y }) {
  presentationWindow = new BrowserWindow({
    x, 
    y,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  presentationWindow.maximize();
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    presentationWindow.loadURL('http://localhost:3000/PresentationScreen');
  }

  presentationWindow.show();

  presentationWindow.on('closed', () => {
    presentationWindow = null
  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  const allDisplays = _screen.getAllDisplays()
  if(allDisplays && allDisplays.length === 1) {
    throw 'Precisa ter mais de um monitor';
  }
  
  let mainDisplay;
  let presentationDisplay;
  if(allDisplays[0].bounds.x !== 0 || allDisplays[0].bounds.y !== 0) {
    presentationDisplay = allDisplays[0];
    mainDisplay = allDisplays[1];
  } else {
    presentationDisplay = allDisplays[1];
    mainDisplay = allDisplays[0];
  }

  createMainWindow(mainDisplay.bounds);
  createPresentationWindow(presentationDisplay.bounds);
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow(mainDisplay.bounds);
      createPresentationWindow(presentationDisplay.bounds);
    } 
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});