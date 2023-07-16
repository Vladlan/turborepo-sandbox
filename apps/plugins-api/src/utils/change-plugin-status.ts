import { DataGuardDataType } from 'types'

export const changePluginStatus = (
  db: DataGuardDataType,
  tab: string,
  plugin: string,
  status: string,
) => {
  const { active, disabled, inactive } = db.tabdata[tab]
  db.tabdata[tab].active = active.filter((p) => p !== plugin)
  db.tabdata[tab].disabled = disabled.filter((p) => p !== plugin)
  db.tabdata[tab].inactive = inactive.filter((p) => p !== plugin)

  if (status === 'active') {
    db.tabdata[tab].active.push(plugin)
  } else if (status === 'disabled') {
    db.tabdata[tab].disabled.push(plugin)
  } else if (status === 'inactive') {
    db.tabdata[tab].inactive.push(plugin)
  }
}
