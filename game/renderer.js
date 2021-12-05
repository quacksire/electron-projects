// This file is required by the index.html file and will
// be executed in the renderer process for that window.

const { ipcRenderer } = require("electron/renderer")

// All of the Node.js APIs are available in this process.
const QueryString = window.location.search;
const urlParams = new URLSearchParams(QueryString);


async function pullDataAndSend() {
    let trivia = await fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`)
    trivia = await trivia.json()
    console.log(trivia.results)
    ipcRenderer.send('start', trivia.results)
}
document.getElementById('start').addEventListener('click', () => {
    document.getElementById('start').innerHTML = `<div class="spinner-border" role="status"></div>`
    pullDataAndSend()
})

if (urlParams.has('question')) document.getElementById("question").innerHTML = urlParams.get('question')
if (urlParams.has('answer')) document.getElementById("answer").innerHTML = urlParams.get('answer')