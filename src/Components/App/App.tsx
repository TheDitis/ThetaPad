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

// TODO: Show line lengths on canvas (optional?)
// TODO: Show angles on canvas (optional?)
// TODO: Resize shapes with image
// TODO: Add segment dropdown for poly shapes
// TODO: Add help button in navbar that shows info on the app
// TODO: Cache store so users don't lose everything if they accidentally refresh


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
