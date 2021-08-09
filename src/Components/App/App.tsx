/** App.tsx
 * @file The root component of the ThetaPad app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import './App.css';
import ThetaPad from "../ThetaPad/ThetaPad";
import Navbar from "../Navbar/Navbar";
import React from "react";
import AppContextProvider from "./AppContextProvider";
import LogRocket from "logrocket";

LogRocket.init('ixpzlp/thetapad-2');


const App = () => {
    return (
        <AppContextProvider>
            <div className="App">
                <Navbar/>
                <ThetaPad/>
            </div>
        </AppContextProvider>
    );
}

export default App;
