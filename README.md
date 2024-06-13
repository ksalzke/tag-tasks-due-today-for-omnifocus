> [!NOTE]  
> This plug-in is no longer actively maintained, due to changes in more recent versions of OmniFocus: more flexible date rules in perspectives have solved the use case for which this was intended.

# About

This is an Omni Automation plug-in bundle for OmniFocus that tags tasks that are due today.

_Please note that all scripts on my GitHub account (or shared elsewhere) are works in progress. If you encounter any issues or have any suggestions please let me know--and do please make sure you backup your database before running scripts from the internet!)_

## Known issues 

Refer to ['issues'](https://github.com/ksalzke/tag-tasks-due-today-for-omnifocus/issues) for known issues and planned changes/enhancements.

# Installation & Set-Up

## Synced Preferences Plug-In

**Important note: for this plug-in bundle to work correctly, my [Synced Preferences for OmniFocus plug-in](https://github.com/ksalzke/synced-preferences-for-omnifocus) is also required and needs to be added to the plug-in folder separately.**

## Installation

1. Download the [latest release](https://github.com/ksalzke/tag-tasks-due-today-for-omnifocus/releases/latest).
2. Unzip the downloaded file.
3. Move the `.omnifocusjs` file to your OmniFocus plug-in library folder (or open it to install).
4. Configure your 'due today' using the `Preferences` action.

## Set-Up

This plug-in makes use of a tag (e.g. `⚠️ Due Today`) that denotes a task that is due today, and which can be set in Preferences.

This tags should be created manually and can then be selected in Preferences.

# Actions

This plug-in contains the following actions:

## Tag Due Tasks

This action can be run at anytime.

It adds the specified tag to any tasks that are due today.

## Preferences

This action allows the user to set the preferences for the plug-in. These sync between devices using the Synced Preferences plug-in linked above.

The following preference is available:

* **'Due Today' Tag**. This tag is used to tag any tasks that are due today.

# Functions

This plug-in contains a number of functions within the `tagDueTasksLib` library.

## `loadSyncedPrefs () : SyncedPref`

Returns the [SyncedPref](https://github.com/ksalzke/synced-preferences-for-omnifocus) object for this plug-in.

If the user does not have the plug-in installed correctly, they are alerted.

## `dueTodayTag () : Tag | null`

Returns the 'due today' tag, if set in preferences. If no tag has been set, returns null.

## `getDueTodayTag (prefTag: string) : Tag`

**Asynchronous.** Returns the 'due today' tag, if set in preferences. If no tag has been set, shows the preferences form until this has been set.

## `isToday (date: Date) : boolean`

Returns `true` if the given date is today. Otherwise, returns `false`.

## `tagDueTasks ()`

**Asynchronous.** Adds the 'Due Today' tag to any tasks that are due today.

## `onComplete (task: Task)`

Intended to be run on completed tasks and is used by my [Custom Complete plug-in](https://github.com/ksalzke/custom-complete-omnifocus-plugin). Removes the 'Due Today' tag from the given task. (This is designed to assist with repeating tasks.)
