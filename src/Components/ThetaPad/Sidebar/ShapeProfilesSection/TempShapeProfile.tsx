import {useSelector} from "react-redux";
import {shapeCountSelector, tempShapeSelector} from "../../../../redux/selectors";
import ShapeProfile from "./ShapeProfiles/ShapeProfile";
import React from "react";


const TempShapeProfile = (props) => {
    const tempShape = useSelector(tempShapeSelector);
    const numShapes = useSelector(shapeCountSelector);
    return tempShape !== null ? (
        <ShapeProfile shape={tempShape} index={numShapes + 1}/>
    ) : null
}


export default TempShapeProfile;