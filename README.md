# komoot job application test

Check out the [Live demo](https://komoot-test.now.sh/).

## Install

`npm ci`

## Running

`npm run dev`

open `http://localhost:1234`

## Used technologies

* reactjs (with hooks)
* leaflet for map display
* parceljs as bundler

## Issues

### Leaflet

It seems this library is still not usable in a fine grained ES6 like manner.
Several issues about that are still open. I think its about time to break
backward compatibility with a semantically correct versioned 2.0 that supports
ES module imports. This will break all plugins that rely on `L` exposed in the
global namespace.

## Features

The app stores the track points in local storage so they are not lost when
navigating from the app's page (like when viewing the GPX output).

## Possible Enhancements

* [x] Drag & Drop in track point list
* [x] Add feedback links
* [x] Add privacy policy and allow to clear local storage
* [x] Undo
* [ ] Redo
* [ ] ResetTrackDialog could be embedded into ResetTrackButton as its not used somewhere else
* [ ] Remove "Reset" confirm dialog. With undo its no longer required.
* [ ] Export map as image
* [ ] Split path when clicked on it
* [ ] Add elevation display for the track

## License

MIT
