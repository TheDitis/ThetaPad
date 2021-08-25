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

// TODO: Add settings menu to navbar
// TODO: Add ability to name Shapes
// TODO: Show angles on canvas (optional?)
// TODO: Resize shapes with image
// TODO: Add help button in navbar that shows info on the app
// TODO: Cache store so users don't lose everything if they accidentally refresh
// TODO: Add Layer to highlight 'selected' shapes


const App = () => {
    return (
        <div className="App">
            <Navbar/>
            <ThetaPad/>
            <ResizeListener/>
            <KeyListener/>
        </div>
    );
}

export default App;
