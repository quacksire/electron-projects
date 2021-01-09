//------------------ Do not remove -----------------//

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
var fs = require('fs');


//-----Default Settings-------------//

var points = 0
var lives = 3
    //var shuffle = false

//-----------Generic Top-------------//
let topContent =


    "

//------------------ Electron Setup -----------------//

function createMainWindow() {
    const window = new BrowserWindow({
        width: 1000,
        height: 1000,
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
    window.loadFile('q.html')
    window1.loadFile('a.html')
        // Open the DevTools.
        // mainWindow.webContents.openDevTools()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createMainWindow())
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



//------------------ Game Setup -----------------//


// Triggers
var correctA = false
exports.correct = () => correctA = true
exports.incorrect = () => correctA = false
exports.next = () => false

function setupQuestions() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple', true)
    request.onload = function() {
            var data = JSON.parse(this.response)
            if (request.status >= 200) {
                console.log(data)
                document.write(data.results[1].question)
            } else {
                console.log('error')
            }
        }
        // Send request
    request.send()
    return data.results
}
var setupMessage = "Called API"
var question = setupQuestions()
var questionNum = -1
var fileName = location.href.split("/").slice(-1)
alert(location)

game(question, questionNum, lives, points)

function game(question, questionNum, lives, points) {
    while (lives > 0 || questionNum > 10) {
        while (correctA === true) {}
    }
}