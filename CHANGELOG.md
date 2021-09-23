# Changelog

## [2.1.2] - 2021-09-23
### Added
- Undo & Redo buttons in sidebar
- Keyboard shortcuts to open tools (t), toggle grid (g), & toggle image filters (f)

## [2.1.1] - 2021-09-22
### Added
- Undo & Redo of shape creation and removal (ctrl/cmd + z & ctrl/cmd + shift + z)

## [2.1.0] - 2021-09-21
### Changed
- Improve: Shape profile will now change theme when any of its values are set as the unit value so that the unit shape is more easily identified

## [2.0.9] - 2021-09-20
### Changed
- Improve: Shapes now scale automatically with the image when the window is resized with an image present

## [2.0.8] - 2021-09-18
### Added
- Hover over poly-line segment number to highlight that segment on canvas

## [2.0.7] - 2021-09-16
### Added
- Hover over point-angle info in poly-line dropdown menu to highlight it on canvas, so you know which point is which
- Shows preview of potential poly-line point removal to prevent accidental removal of the wrong line

## [2.0.6] - 2021-09-13
### Added
- Snackbar notifiers to notify the user of status or certain events

## [2.0.5] - 2021-09-08
### Added
- Length indicators can now be clicked to set the length unit to that value, or reset it to 1 if already selected

### Removed
- Dedicated unit button

## Changed
- Improve: performance when changing color of poly-objects with details dropdown open


## [2.0.4] - 2021-09-05
### Added
- Name shapes individually

### Changed
- Style: swapped position of the hide and unit buttons


## [2.0.3] - 2021-09-05
### Added
- Show/hide shapes individually

### Changed
- Fix: poly-segment points showing jittery partial x when in mid-draw with details section open


## [2.0.2] - 2021-09-04
### Added
- Angle annotations for poly-lines on canvas

### Changed
- Improve: poly-segment angles to indicate angle between segments
- Improve: poly angles now straddle segments
- Fix: poly-profile point svg animation twitchiness


## [2.0.1] - 2021-09-01
### Added
- New Filters Tool to apply basic filters to images


## [2.0.0] - 2021-08-29
### Added
- Upload images
- Draw measurement shapes over images (line, poly-line, & circle)
- Select shapes as length-unit to measure other lengths by
- Select color of each shape individually
- View poly-line segment details individually
- Set line-segment length as unit length
- Overlay customizable grid on image
- Images & grid resize dynamically (shapes do not yet!)
- Keyboard shortcuts for changing draw-mode and end a poly-draw
- Remove individual points in poly-line