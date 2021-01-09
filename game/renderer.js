// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

document.getElementById("body").style.property.backgroundColor = fff0

const { remote } = require('electron');
const Game = remote.require('./main.js');