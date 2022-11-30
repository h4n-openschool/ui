const { join } = require("path");
const { BrowserWindow, app, ipcMain } = require("electron");

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

process.env.NODE_ENV = 'development';

const hostname = 'localhost'
const port = 51909
// when using middleware `hostname` and `port` must be provided below
const nextApp = next({ dev: true, hostname, port })
const handle = nextApp.getRequestHandler()

process.env.NEXTAUTH_SECRET = 'unsafe pls change';
process.env.NEXTAUTH_URL = `http://${hostname}:${port}`;

nextApp.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/a') {
        await nextApp.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await nextApp.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
    app.whenReady().then(async () => {
      const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: false,
          preload: join(__dirname, "preload.js"),
        },
      });

      // Load renderer using a custom protocol:
      mainWindow.loadURL(`http://${hostname}:${port}`);

      // You can load deeplinks too (e.g: pages/about):
      // mainWindow.loadURL("next://app/about");
    });

    // Quit the app once all windows are closed
    app.on("window-all-closed", app.quit);

    // listen the channel `message` and resend the received message to the renderer process
    ipcMain.on("message", (event, message) => {
      event.sender.send("message", message);
    });
  });
})

