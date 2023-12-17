import { DataGuardDataType } from 'types'

export const collectTabPlugins = (db: DataGuardDataType, tab: string) => {
  const { active, disabled, inactive } = db.tabdata[tab]
  const plugins = [...active, ...disabled, ...inactive]
  return plugins
    .map((plugin) => {
      const [, n] = db.plugins[plugin].title.split(' ')
      return {
        id: plugin,
        order: Number.parseInt(n),
        title: db.plugins[plugin].title,
        description: db.plugins[plugin].description,
        active: active.includes(plugin),
        disabled: disabled.includes(plugin),
        inactive: inactive.includes(plugin),
      }
    })
    .sort((a, b) => a.order - b.order)
}
