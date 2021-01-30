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
const needle = require('needle');
//let appPath = remote.getAppPath();
//const net = require('electron').remote.net;

//-----Default Settings-------------//

var points = 0
var lives = 3
var startup = 0
    //var shuffle = false

//-----------Files-------------//
store.set('topContent', '<!DOCTYPE html><html lang="en"><html encoding="utf-8"><body><a href="index.html"><button type="button">')
store.set('topAContent', ' type="button" onclick="javascript:Game.correct();>')
store.set('bottomContent', '</button></body></html>')

//------------------ Electron Setup -----------------//
function getQuestions() {
    //http://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
    //var get = document.getElementById('get');
    var q
    const request = net.request({
        method: 'GET',
        protocol: 'http:',
        hostname: 'opentdb.com',
        path: 'api.php?amount=10&category=9&difficulty=easy&type=multiple', //----------------------------------------Add Customization Here
        redirect: 'follow'
    });
    request.on('response', (response, q) => {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

        response.on('data', (chunk, q) => {
            console.log(`BODY: ${chunk}`)
            q = response
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
    return request.response.results
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
    window.on('page-title-updated', () => {
        start(startup, window)
        startup++
    })
}

function qaWindows(action) {
    // Create the browser window.
    const q = new BrowserWindow({
        width: 500,
        height: 500,
        name: "a",
        transparent: true
    })
    const a = new BrowserWindow({
        width: 500,
        height: 500,
        name: "b",
        transparent: true
    })
    if (action === "open") {
        q.loadFile('q.html')
        a.loadFile('a.html')
    } else if (action === "close") {
        q.close()
        a.close()
    } else {
        console.log("[ERROR] - No action passed to qaWindows(); Availible actions are ''open'' or ''close''")
    }


    a.on('page-title-updated', () => {
        qaWindows('close')
    })

    q.on('page-title-updated', () => {
            qaWindows('close')
        })
        // Open the DevTools.
        // mainWindow.webContents.openDevTools()
}
//------------------ Game Functions ------------------//
function game(question, questionNum, lives, points, correctA, time) {

    while (lives > 0 || questionNum > 10) {
        points += 10
        qaWindows("close")
        fs.writeFile('a.html', store.get('topContent') + question[questionNum].correct_answer + store.get('bottomContent'), function(err) {
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

function setupQuestions() {
    var data = http.request("http://api.fungenerators.com/trivia/random")
        //("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
        //https://api.fungenerators.com/trivia/random
    console.log(data.questions)



    data = needle.get('http://api.fungenerators.com/trivia/random', { json: true }, (err, res) => {
        if (err) {
            return console.log(err);
        }
        return res.body
    });

    return data

}

//------------------ Elctron Methods ------------------//

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

    const question = setupQuestions()
    console.log("\n\n\n\n\n\n\n\n\n" + question.results)
    mainWindow("open")
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


function start(a, window) {
    if (a >= 1) {
        console.log("\nStarting! " + a + " \n")
        bufferWin('open')
        window.close()
        game(question, questionNum, lives, points, correctA, time)
    } else {
        console.log("\nSkipping on startup\n")
    }
}

function bufferWin(action) {
    const mainWindow = new BrowserWindow({
        height: 1,
        width: 1,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
        title: 'Trivia with Twist',
        transparent: true
    });
    mainWindow.setTitle('Trivia with Twist')
    mainWindow.loadFile('index.html')
    if (action === "open") {
        mainWindow.loadFile('index.html')
    } else if (action === "close") {
        mainWindow.close()
    } else {
        console.log("[ERROR] - No action passed to bufferWin; Availible actions are ''open'' or ''close''")
    }
}