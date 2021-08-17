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
