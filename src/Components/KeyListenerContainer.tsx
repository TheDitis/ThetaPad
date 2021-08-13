import {useDispatch, useSelector} from "react-redux";
import {tempShapeSelector} from "../redux/selectors";
import React, {useEffect} from "react";
import keyboardEventHandler from "./ThetaPad/keyboardEventHandler";


const KeyListenerContainer: React.FC = () => {
    const dispatch = useDispatch();
    const tempShape = useSelector(tempShapeSelector);

    useEffect(() => {
        const handleKeyEvent = keyboardEventHandler(dispatch, tempShape);
        window.addEventListener("keydown", handleKeyEvent);

        return () => {
            window.removeEventListener("keydown", handleKeyEvent);
        }
    }, [dispatch, tempShape]);

    return null
}

export default KeyListenerContainer;