/** App.tsx
 * @file The root component of the ThetaPad app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import './App.css';
import ThetaPad from "../ThetaPad/ThetaPad";
import Navbar from "../Navbar/Navbar";
import React from "react";
import KeyListener from "./EventListenerComponents/KeyListener";
import ResizeListener from "./EventListenerComponents/ResizeListener";
import {createTheme, ThemeProvider} from "@material-ui/core";
import {blueGrey, grey, teal} from "@material-ui/core/colors";

// TODO: Add settings menu to navbar
// TODO: Add ability to name Shapes
// TODO: Show angles on canvas (optional?)
// TODO: Resize shapes with image
// TODO: Add help button in navbar that shows info on the app
// TODO: Cache store so users don't lose everything if they accidentally refresh
// TODO: Add Layer to highlight 'selected' shapes
// TODO: Image filters
// TODO: Grid tool

// FIX TODOS:
// TODO: make ShapeProfileBase dropdown animation match that of ToolProfileBase
// TODO: make grid snap to image on upload, not just on resize


const theme = createTheme({
    palette: {
        primary: {
            light: blueGrey[200],
            main: blueGrey[800],
            dark: blueGrey[900]
        },
        secondary: teal,
        text: {
            disabled: grey[700]
        }
    }
})


const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Navbar/>
                <ThetaPad/>
                <ResizeListener/>
                <KeyListener/>
            </div>
        </ThemeProvider>
    );
}

export default App;
