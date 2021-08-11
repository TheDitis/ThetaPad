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
import store from "../../redux/store";
import {Provider} from "react-redux";

LogRocket.init('ixpzlp/thetapad-2');


const App = () => {
    return (
        <AppContextProvider>
            <Provider store={store}>
                <div className="App">
                    <Navbar/>
                    <ThetaPad/>
                </div>
            </Provider>
        </AppContextProvider>
    );
}

export default App;
