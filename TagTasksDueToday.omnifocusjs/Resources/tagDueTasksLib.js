/* global PlugIn Version Tag Calendar Alert flattenedTasks */
(() => {
  const tagDueTasksLib = new PlugIn.Library(new Version('1.0'))

  tagDueTasksLib.loadSyncedPrefs = () => {
    const syncedPrefsPlugin = PlugIn.find('com.KaitlinSalzke.SyncedPrefLibrary')

    if (syncedPrefsPlugin !== null) {
      const SyncedPref = syncedPrefsPlugin.library('syncedPrefLibrary').SyncedPref
      return new SyncedPref('com.KaitlinSalzke.TagTasksDueToday')
    } else {
      const alert = new Alert(
        'Synced Preferences Library Required',
        'For the \'Tag Tasks Due Today\' plug-in to work correctly, the \'Synced Preferences for OmniFocus\' plug-in (https://github.com/ksalzke/synced-preferences-for-omnifocus) is also required and needs to be added to the plug-in folder separately. Either you do not currently have this plugin installed, or it is not installed correctly.'
      )
      alert.show()
    }
  }

  tagDueTasksLib.dueTodayTag = () => {
    const syncedPrefs = tagDueTasksLib.loadSyncedPrefs()
    const dueTodayTagID = syncedPrefs.read('dueTodayTagID')
    if (dueTodayTagID === null) return null
    else return Tag.byIdentifier(dueTodayTagID)
  }

  tagDueTasksLib.getDueTodayTag = async () => {
    const dueTodayTag = tagDueTasksLib.dueTodayTag()
    if (dueTodayTag !== null) return dueTodayTag

    // not set - show preferences pane and then try again)
    await this.action('preferences').perform()
    return await tagDueTasksLib.getDueTodayTag()
  }

  tagDueTasksLib.isToday = (date) => {
    return Calendar.current.startOfDay(date).getTime() === Calendar.current.startOfDay(new Date()).getTime()
  }

  tagDueTasksLib.tagDueTasks = async () => {
    const tag = await tagDueTasksLib.getDueTodayTag()

    const tasksDueToday = flattenedTasks.filter(task => task.effectiveDueDate !== null && tagDueTasksLib.isToday(task.effectiveDueDate))

    for (const task of tasksDueToday) task.addTag(tag)
  }

  tagDueTasksLib.onComplete = task => {
    console.log('in onComplete')
    const tag = tagDueTasksLib.dueTodayTag()
    if (tag !== null) task.removeTag(tag)
  }

  return tagDueTasksLib
})()
