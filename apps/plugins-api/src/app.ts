import express, { Request, Response } from 'express'
import { data } from './../fe-challenge.json'
import { DataGuardDataType } from 'types'

const db = data as DataGuardDataType

const app = express()

app.get('/', (req, res) => res.send('It works!'))

app.get('/tab/list', (req: Request, res: Response) => {
  const tabs = db.tabs
  res.json(tabs)
})

app.get('/tab/:name', (req: Request, res: Response) => {
  const { name } = req.params
  const tabdata = db.tabdata[name]
  if (tabdata) {
    res.json(tabdata)
  } else {
    res.status(404).json({ error: 'Tab not found' })
  }
})

app.get('/plugin/list', (req: Request, res: Response) => {
  const plugins = db.plugins
  res.json(plugins)
})

app.get('/plugin/:name', (req: Request, res: Response) => {
  const { name } = req.params
  const plugin = db.plugins[name]
  if (plugin) {
    res.json(plugin)
  } else {
    res.status(404).json({ error: 'Plugin not found' })
  }
})

app.post('/plugin', (req: Request, res: Response) => {
  const { name, title, description } = req.body
  if (!name || !title || !description) {
    res.status(400).json({ error: 'Missing required fields' })
  } else {
    db.plugins[name] = { title, description }
    res.sendStatus(200)
  }
})

app.post('/tab', (req: Request, res: Response) => {
  const { name, title, icon, active, disabled, inactive } = req.body
  if (!name || !title || !icon || !active || !disabled || !inactive) {
    res.status(400).json({ error: 'Missing required fields' })
  } else {
    db.tabdata[name] = { title, icon, active, disabled, inactive }
    res.sendStatus(200)
  }
})

const PORT = import.meta.env.PORT || 3000
app.listen(import.meta.env.PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

export const viteNodeApp = app
