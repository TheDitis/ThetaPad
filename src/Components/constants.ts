/** constants.ts
 * @file definitions of constant values used throughout the app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */

// Height of the navbar in px
export const NAVBAR_HEIGHT = 45;

// Maximum width of the sidebar
export const MAX_SIDEBAR_WIDTH = 350;

// Minimum width of the sidebar
export const MIN_SIDEBAR_WIDTH = 320;

// Height of the shape profiles when closed
export const SHAPE_PROFILE_HEIGHT = 65;

// Height of individual Poly segment profiles in the Poly profile dropdown
export const POLY_SEGMENT_HEIGHT = 50;

// Static default color options
export const COLORS = [
    "#FF0000", // "red",
    "#DC143C", // "crimson",
    "#FF4500", // "orangered",
    "#FF8C00", // "darkorange",
    "#FFA500", // "orange",
    "#FFD700", // "gold",
    "#FFFF00", // "yellow",
    "#ADFF2F", // "greenyellow",
    "#7CFC00", // "lawngreen",
    "#32CD32", // "limegreen",
    "#00FF7F", // "springgreen",
    "#00FA9A", // "mediumspringgreen",
    "#66CDAA", // "aquamarine",
    "#40E0D0", // "turquoise",
    "#00FFFF", // "aqua",
    "#00BFFF", // "deepskyblue",
    "#1E90FF", // "dodgerblue",
    "#7B68EE", // "mediumslateblue",
    "#9370DB", // "mediumpurple",
    "#8A2BE2", // "blueviolet",
    "#9400D3", // "darkviolet",
    "#800080", // "purple",
    "#C71585", // "mediumvioletred"
]

// Minimum length of line in px to be valid
export const MIN_LINE_LENGTH = 8;

// Minimum number of points in a poly line for it to be valid
export const MIN_POLY_POINTS = 2;

// Minimum radius of circle in px to be valid
export const MIN_CIRCLE_RADIUS = 5;

// Distance from the line and the length-info of that line in px
export const LINE_INFO_TEXT_OFFSET = 5;