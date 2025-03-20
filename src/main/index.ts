import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// import { exec } from 'child_process';
import { dialog } from 'electron/main';

// async function runPythonScript() {
//   const pythonScriptPath = path.join(__dirname, 'python_scripts', 'main.py');
//   try {
//     const result = await new Promise((resolve, reject) => {
//       exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
//         if (error) {
//           console.log(error);
//           reject(error)
//         } else if (stderr) {
//           console.log(stderr);
//           reject(stderr)
//         } else {
//           resolve(stdout);
//         }
//       });
//     });
//     console.log(`Python script output: ${result}`);
//     return 'ok';
//   } catch (error) {
//     console.error(`Error executing Python script: ${error}`);
//     throw error; // 可以选择重新抛出错误或返回特定的值
//   }
// }

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?.setTitle(title)
}

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
  return ""
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  optimizer.registerFramelessWindowIpc()
  // ipcMain.handle('runPythonScript',() => runPythonScript())
  // IPC test
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('ping', async () => { return 'pong'})
  ipcMain.on('set-title', handleSetTitle)
  ipcMain.on('go-back', async () => {
      // const win = BrowserWindow.fromWebContents(event.sender)
      console.log('go back')
    })
    

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
