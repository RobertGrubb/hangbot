# HangBot

This is the very early stages of HangBot, a Google Chrome extension that loads
hangouts automatically based on settings you provide. No more having to remember
to start hangouts. We've got you covered!

## Get started

0. `npm install`
0. Run either of the following:
  - `gulp` to build the extension.
  - or `gulp watch` to just watch for changes.

0. The manifest.json file lives inside of the build directory after it is
created. Simply choose the build directory when loading the extension into Chrome.
0. Remember to Reload the extension between any changes.


## TODO

0. [ ] Add set to the chrome-storage lib.
0. [x] ~~Add desktop notification for load-warning.~~
0. [x] ~~Add better time selector for start/end time.~~
0. [x] ~~Add validation to only allow hangout urls.~~
0. [x] ~~Add option to `auto-join` hangout (Bypass the join button)~~
0. [x] ~~Add listener for end time to close hangout~~
0. [x] ~~Improve basic UI~~

## Future Features

0. [ ] Sync with Google Calendar API to auto-join scheduled hangouts
0. [ ] Add ability to handle multiple hangouts
