/** App.tsx
 * @file The root component of the ThetaPad app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import './App.css';
import ThetaPad from "../ThetaPad/ThetaPad";
import Navbar from "../Navbar/Navbar";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setWindowDimensions} from "../../redux/slices/dimensionsSlice";
import KeyListenerContainer from "../KeyListenerContainer";


const App = () => {
    const dispatch = useDispatch();

    /**
     * ON MOUNT: add a window-resize event listener that updates dimensions
     * ON UNMOUNT: remove that event listener
     */
    useEffect(() => {
        const updateDimensions = (e) => {
            dispatch(setWindowDimensions({
                width: e.target.innerWidth,
                height: e.target.innerHeight
            }))
        }

        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        }
    }, [dispatch]);


    return (
        <div className="App">
            <Navbar/>
            <ThetaPad/>
            <KeyListenerContainer/>
        </div>
    );
}

export default App;
