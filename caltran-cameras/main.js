// A BrowserView can be used to embed additional web content into a BrowserWindow.
// It is like a child window, except that it is positioned relative to its owning
// window. It is meant to be an alternative to the webview tag.
//
// For more info, see:
// https://electronjs.org/docs/api/browser-view

// In the main process.
const { BrowserView, BrowserWindow, app, MenuItem } = require('electron')
var startup = 0
var indexPage = 'https://cwwp2.dot.ca.gov/vm/streamlist.htm'
    //mtemp = new MenuItem
app.whenReady().then(() => {
    let win = new BrowserWindow({ width: 1100, height: 500, webPreferences: { webSecurity: false } })

    win.on('closed', () => {
        win = null
    })

    const view = new BrowserView({
        webPreferences: {
            nodeIntegration: true

        }
    })

    win.setBrowserView(view)
    win.loadURL(indexPage)
    win.on('page-title-updated', () => {
        let win2 = new BrowserWindow({ width: 310, height: 425, transparent: true, webPreferences: { webSecurity: false } })
        if (win.webContents.getURL() != indexPage || win.webContents.getURL() != 'about:blank') {
            win2.loadURL(win.webContents.getURL())
            win.loadURL(indexPage)
        }

        win2.on('page-title-updated', () => {
            if (win2.webContents.getURL() == indexPage) {
                win2.close()
            } else {
                win2.webContents.insertCSS('#wx{position:absolute;top:270px;width:320px;color:rgb(255,255,255);}')
            }
        })
        app.in
    })
})