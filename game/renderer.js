// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

document.getElementById("body").style.property.backgroundColor = fff0

const { ipcRenderer } = require('electron');

document
    .querySelector('start')
    .addEventListener('click', () => {
        ipcRenderer.send('start');
    });
const { remote } = require('electron');
const main = remote.require('./main.js');