/* global PlugIn Form flattenedTags */
(() => {
  const action = new PlugIn.Action(async function (selection, sender) {
    const syncedPrefs = this.tagDueTasksLib.loadSyncedPrefs()

    // get current preferences or set defaults if they don't yet exist
    const dueTodayTag = this.tagDueTasksLib.dueTodayTag()

    // create and show form
    const form = new Form()
    const tagNames = flattenedTags.map(t => t.name)

    form.addField(new Form.Field.Option('dueTodayTag', '\'Due Today\' tag', flattenedTags, tagNames, dueTodayTag, 'Please select a tag'))

    await form.show('Preferences: Agendas', 'OK')

    // save preferences
    syncedPrefs.write('dueTodayTagID', form.values.dueTodayTag.id.primaryKey)
  })

  action.validate = function (selection, sender) {
    return true
  }

  return action
})()
