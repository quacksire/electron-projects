// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')

//-----Default Settings-------------//

var points = 0
var lives = 3
var shuffle = false

//---------------------------------//


function createMainWindow(){
    const window = new BrowserWindow({
        width: 1000,
        height: 1000
        name: "Game",
        transparent: false
    })
}
function createQAnswers(questionNum) {
    // Create the browser window.
    const window = new BrowserWindow({
        width: 500,
        height: 500,
        name: "a",
        transparent: true
    })
    const window1 = new BrowserWindow({
        width: 500,
        height: 500,
        name: "b",
        transparent: true
    })
    const window2 = new BrowserWindow({
        width: 500,
        height: 500,
        name: "c",
        transparent: true
    })
    const window3 = new BrowserWindow({
        width: 500,
        height: 500,
        name: "d",
        transparent: true
    })

    // and load the index.html of the app.

    window.loadFile('/questions/' + questionNum +'/answers/a.html')
    window1.loadFile('/questions/' + questionNum +'/answers/b.html')
    window2.loadFile('/questions/' + questionNum +'/answers/c.html')
    window3.loadFile('/questions/' + questionNum +'/answers/d.html')
        // Open the DevTools.
        // mainWindow.webContents.openDevTools()
}


function Game(){
  while()

}







// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createQAnswers)
for (var i = 0; i < 9; i++) {
    console.log(i)
        // more statements
}
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
/*
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
*/
app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createQAnswers()
    }
})
app.once('ready-to-show', () => {
    app.show()
})
app.e
const template = [{
    label: 'Hello From Electron!',
    submenu: [{
        label: 'Quit',
        click() {
            app.close()
        }
    }, ]
}]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and require them here.