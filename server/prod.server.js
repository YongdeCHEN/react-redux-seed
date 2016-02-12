import path from 'path'
import express from 'express'
import compression from 'compression'
import servefavicon from 'serve-favicon'
import serveStatic from 'serve-static'
import proxy from 'proxy-middleware'
import url from 'url'

import serverConfig from './config'

const { host, prodPort } = serverConfig

const app = express()

const staticPath = path.resolve(path.join(__dirname, '..', 'static'))
const faviconPath = path.join(staticPath, 'favicon.ico')
const indexPath = path.join(staticPath, 'index.html')

app.use(compression())
app.use(servefavicon(faviconPath))
app.use(serveStatic(staticPath))

app.get('/*', function(req, res) {
    res.sendFile(indexPath)
})

app.listen(prodPort, err => {
  if (err) {
    console.error(err);
  }
  console.info('prod-server http://' + host + ':' + prodPort + ' is on')
})
