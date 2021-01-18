// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')

//-----Default Settings-------------//

var points = 0
var lives = 3
var shuffle = false

//---------------------------------//


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
var points = 0
var lives = 5
var questionNum = -1
var fileName = location.href.split("/").slice(-1)
alert(location)

game(question, questionNum, lives, points)

function game(question, questionNum, lives, points) {
    while (lives > 0 || questionNum > 10) {
        var questionNum = questionNum + 1
        if (fileName === "q.html") {
            document.write(question[questionNum].question)
        } else if (fileName === "a.html") {
            document.write(question[questionNum].correct_answer)
        }
    }
}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.