//------------------ Do not remove -----------------//
// Modules to control application life and create native browser window
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const { app, BrowserWindow, Menu, ipcRenderer, ipcMain, ClientRequest, electron } = require('electron')
const Store = require('electron-store')
var remote = require('electron').remote
const { promisify } = require('util')
ipcMain.handle('lstat', async(event, filename) => await fs.promises.lstat(filename))
const store = new Store()
const storage = require('electron-storage')
const jsom = require('electron-json-storage')
const os = require('os')
const fs = require('fs')
const { net } = require('electron')
const http = require('http')
let path = require('path');
//let appPath = remote.getAppPath();
//const net = require('electron').remote.net;

//-----Default Settings-------------//

var points = 0
var lives = 3

//var shuffle = false

//-----------Files-------------//
store.set('topContent', '<!DOCTYPE html><html><body><button')
store.set('topAContent', ' type="button" onclick="javascript:Game.correct();>')
store.set('bottomContent', '</button></body></html>')

//------------------ Electron Setup -----------------//
function getQuestions() {
    //http://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
    //var get = document.getElementById('get');

    const request = net.request({
        method: 'GET',
        protocol: 'http:',
        hostname: 'opentdb.com',
        path: 'api.php?amount=10&category=9&difficulty=easy&type=multiple', //----------------------------------------Add Customization Here
        redirect: 'follow'
    });
    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
        });
    });
    request.on('finish', () => {
        console.log('Request is Finished')
    });
    request.on('abort', () => {
        console.log('Request is Aborted')
    });
    request.on('error', (error) => {
        console.log(`ERROR: ${JSON.stringify(error)}`)
    });
    request.on('close', (error) => {
        console.log('Last Transaction has occured')
    });
    request.setHeader('Content-Type', 'application/json');
    request.end();
    return JSON.stringify(response.results)
}

function mainWindow(action) {
    const window = new BrowserWindow({
        width: 1000,
        height: 1000,
        name: "Game",
        transparent: false
    })
    if (action === "open") {
        window.loadFile('main.html')
    } else if (action === "close") {
        window.close()
    } else {
        console.log("ERROR: No action passed to mainWindow(); Availible actions are ''open'' or ''close''")
    }

}

function qaWindows(action) {
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
    if (action === "open") {
        window.loadFile('q.html')
        window1.loadFile('a.html')
    } else if (action === "close") {
        window.close()
        window1.close()
    } else {
        console.log("[ERROR] - No action passed to qaWindows(); Availible actions are ''open'' or ''close''")
    }
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}
//------------------ Game Functions ------------------//
function game(question, questionNum, lives, points, correctA, time) {

    while (lives > 0 || questionNum > 10) {
        points += 10
        qaWindows("close")
        fs.writeFile('a.html', store.get('topContent') + store.get('topAContent') + question[questionNum].question + store.get('bottomContent'), function(err) {
            if (err) throw err;
            console.log('Replaced a.html!');
        });

        fs.writeFile('q.html', store.get('topContent') + question[questionNum].question + store.get('bottomContent'), function(err) {
            if (err) throw err;
            console.log('Replaced q.html!');
        });

        qaWindows("open")
        while (correctA === false) { time = time + 1 }
    }
}

/*function setupQuestions() {
var data = http.request("http://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    //("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
console.log(data.questions)
return data
}
*/
//------------------ Elctron Methods ------------------//

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    mainWindow("open")
    const question = getQuestions()
});
app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})

app.once('ready-to-show', () => {
    app.show()
})


//------------------ Game Setup -----------------//

//var question = gsetupQuestions()
var questionNum = -1
var time
    //console.log(question[1].type)
    // HTML => Electron Triggers
var correctA = false
exports.correct = () => correctA = true;
exports.incorrect = () => correctA = false;
exports.next = () => correctA = false;
exports.start = () => mainWindow("close") //game(question, questionNum, lives, points, correctA, time)
    //ipcMain.on('start', () => console.log('start \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n aaaaaaaaaaaa'))
ipcMain.on('start', (event, arg) => {
    if (arg === true) {
        console.log("Hi!")
    } else {}
});