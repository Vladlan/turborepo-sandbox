import express, { Request, Response } from 'express'
import { data } from './../fe-challenge.json'
import { DataGuardDataType } from 'types'
import bodyParser from 'body-parser'
import { collectTabPlugins } from './utils/collect-tab-plugins'
import { changePluginStatus } from './utils/change-plugin-status'

const db = data as DataGuardDataType
const app = express()
app.use(bodyParser.json())

app.get('/hi', (req, res) => {
  res.send('Hello World!')
})

app.get('/tab/list', (req: Request, res: Response) => {
  const tabs = db.tabs.map((tab) => {
    return { id: tab, icon: db.tabdata[tab].icon, title: db.tabdata[tab].title }
  })
  res.json(tabs)
})

app.get('/tab-plugins/:name', (req: Request, res: Response) => {
  const { name } = req.params
  const tabdata = db.tabdata[name]
  if (tabdata) {
    const plugins = collectTabPlugins(db, name)
    res.json(plugins)
  } else {
    res.status(404).json({ error: 'Tab not found' })
  }
})

app.post('/plugin', (req: Request, res: Response) => {
  const { tab, plugin, status } = req.body
  if (!tab || !plugin || !status) {
    res.status(400).json({ error: 'Missing required fields' })
  } else {
    changePluginStatus(db, tab, plugin, status)
    res.status(200).json({ message: 'Plugin status changed' })
  }
})

app.get('/*', express.static('public'))
app.use((req, res) => {
  // If the request reaches here, it means the static file was not found
  // Redirect to '/'
  res.redirect('/')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

export const viteNodeApp = app
