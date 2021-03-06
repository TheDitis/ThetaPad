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
import {THEME} from "../../constants";
import store from "../../redux/store";
import {Provider} from "react-redux";
import Overlays from "./Overlays/Overlays";

// TODO: Add settings menu to navbar
// TODO: Add help button in navbar that shows info on the app
// TODO: Cache store so users don't lose everything if they accidentally refresh
// TODO: Implement highlight for other shapes
// TODO: Save sessions
// TODO: Debug export issues on mac


const theme = createTheme({
    palette: THEME,
})


const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Navbar/>
                    <ThetaPad/>
                    <Overlays/>
                    <ResizeListener/>
                    <KeyListener/>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
