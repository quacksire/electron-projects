//------------------ Do not remove -----------------//
// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcRenderer, ipcMain, ClientRequest, electron, shell, CommandLine } = require('electron')
const Store = require('electron-store')
const fetch =
    import ('node-fetch')
    //let appPath = remote.getAppPath();
    //const net = require('electron').remote.net;

//-----Default Settings-------------//

var points = 0
var lives = 3
    //var shuffle = false
var start = false


function mainWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
        title: 'Trivia with a Twist',
    });

    win.setTitle('Trivia with a Twist');
    win.loadFile('pages/start.html');
    //win.webContents.openDevTools();
}

app.whenReady().then(main);

app.on('window-all-closed', () => {
    //if (process.platform !== 'darwin') {
    app.quit();
    //d}
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

function game(trivia, qNum = 0) {
    const { screen } = require('electron')
    let centerOfScreenX = screen.getPrimaryDisplay().bounds.width / 2
    let centerOfScreenY = screen.getPrimaryDisplay().bounds.height / 2

    const q = new BrowserWindow({
        x: centerOfScreenX,
        y: (centerOfScreenY / 2) / 2,
        height: 300,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },

    })
    const a1 = new BrowserWindow({
        x: centerOfScreenX,
        y: centerOfScreenY + 100,
        height: 80,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
    })
    const a2 = new BrowserWindow({
        x: centerOfScreenX,
        y: centerOfScreenY + 200,
        height: 80,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
    })
    const a3 = new BrowserWindow({
        x: centerOfScreenX,
        y: centerOfScreenY + 300,
        height: 80,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
    })
    const a4 = new BrowserWindow({
        x: centerOfScreenX,
        y: centerOfScreenY + 400,
        height: 80,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
    })
    q.loadFile(`pages/q.html`) //?q=${trivia[0].question}
    q.webContents.executeJavaScript(`document.getElementById('question').innerHTML = "${trivia[qNum].question}"`)
    q.title = `Question ${qNum + 1} of ${trivia.length}`
    q.mo
    q.show()


    a1.loadFile(`pages/a.html`)
    a1.webContents.executeJavaScript(`document.getElementById('answer').innerHTML = "${trivia[qNum].correct_answer}"`)

    a2.loadFile(`pages/a.html`)
    a2.webContents.executeJavaScript(`document.getElementById('answer').innerHTML = "${trivia[qNum].incorrect_answers[0]}"`)

    a3.loadFile(`pages/a.html`)
    a3.webContents.executeJavaScript(`document.getElementById('answer').innerHTML = "${trivia[qNum].incorrect_answers[1]}"`)

    a4.loadFile(`pages/a.html`)
    a4.webContents.executeJavaScript(`document.getElementById('answer').innerHTML = "${trivia[qNum].incorrect_answers[2]}"`)

    a1.on('close', () => {
        q.destroy()
        a1.destroy()
        a2.destroy()
        a3.destroy()
        a4.destroy()
        if (qNum + 1 >= trivia.length) {
            game(trivia, qNum + 1)
        } else {
            main()
        }
    })

}


function main() {

    const m = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
    })
    m.loadFile('pages/start.html')
    m.focus()


    ipcMain.on('start', (e, trivia) => {
        m.hide()
        game(trivia)

        //trivia

    })
}