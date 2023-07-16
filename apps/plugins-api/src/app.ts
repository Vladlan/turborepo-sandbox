import express, { Request, Response } from 'express'
import { data } from './../fe-challenge.json'
import { DataGuardDataType } from 'types'

const db = data as DataGuardDataType
const app = express()

const collectTabPlugins = (tab: string) => {
  const { active, disabled, inactive } = db.tabdata[tab]
  const plugins = [...active, ...disabled, ...inactive]
  return plugins.map((plugin) => {
    const [,n] = db.plugins[plugin].title.split(' ')
    return {
      id: plugin,
      order: Number.parseInt(n),
      title: db.plugins[plugin].title,
      description: db.plugins[plugin].description,
      active: active.includes(plugin),
      disabled: disabled.includes(plugin),
      inactive: inactive.includes(plugin),
    }
  }).sort((a, b) => a.order - b.order);
}


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
    const plugins = collectTabPlugins(name)
    res.json(plugins)
  } else {
    res.status(404).json({ error: 'Tab not found' })
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
