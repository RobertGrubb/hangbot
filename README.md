# HangBot

This is the very early stages of HangBot, a Google Chrome extension that loads
hangouts automatically based on settings you provide. No more having to remember
to start hangouts, we've got you covered!

## Get started

1. `npm install`
2. Run either of the following:
  - `gulp` to build the extension.
  - or `gulp watch` to just watch for changes.

3. The manifest.json file lives inside of the build directory after it is
created. Simply choose the build directory when loading the extension into Chrome.
4. Remember to Reload the extension between any changes.


## TODO

1. Add set to the chrome-storage lib.
2. Add listener for end time to close hangout [done]
3. Add check for in-between times if hangout is not open.
4. Add option to `auto-join` hangout (Bypass the join button)
5. Add desktop notification for load-warning.
6. Add better time selector for start/end time.
7. Add better validation for times.
8. Add validation to only allow hangout urls.
9. Improve UI / Add icons.

## Possible Future Features

1. Add ability to handle multiple hangouts

## License

MIT &copy; 2016 Matt Grubb & Brett Hayes
