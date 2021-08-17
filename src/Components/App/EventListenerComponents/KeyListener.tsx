/** KeyListener.tsx
 * @file A null component that holds key-listeners
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {tempShapeSelector} from "../../../redux/selectors";
import keyboardEventHandler from "../../ThetaPad/keyboardEventHandler";

/**
 * Component that manages key-listeners. The component returns null, so why not
 * just use a hook? This is mainly because I wanted this to sit in the top level
 * (App component), but I didn't want to trigger any re-renders when dispatch
 * or tempShape updated, so instead I made it its own dom branch within App, but
 * with no children to rerender
 * @return {null} - nothing (:
 */
const KeyListener: React.FC = () => {
    const dispatch = useDispatch();
    const tempShape = useSelector(tempShapeSelector);

    useEffect(() => {
        const handleKeyEvent = keyboardEventHandler(dispatch, tempShape);
        window.addEventListener("keydown", handleKeyEvent);

        return () => {
            window.removeEventListener("keydown", handleKeyEvent);
        }
    }, [dispatch, tempShape]);

    return null;
}

export default KeyListener;