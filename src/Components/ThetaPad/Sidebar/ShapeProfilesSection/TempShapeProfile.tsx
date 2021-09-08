/** TempShapeProfile.tsx
 * @file Component for the tempShape's ShapeProfile
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {shapeCountSelector, tempShapeSelector} from "../../../../redux/selectors";
import ShapeProfile from "./ShapeProfiles/ShapeProfile";
import React from "react";
import {useAppSelector} from "../../../../hooks/reduxHooks";


/**
 * Profile just for the shape currently being drawn
 * @return {JSX.Element | null} - ShapeProfile for the shape being drawn, or
 *      null if there isn't one
 */
const TempShapeProfile: React.FC = () => {
    const tempShape = useAppSelector(tempShapeSelector);
    const numShapes = useAppSelector(shapeCountSelector);
    return tempShape !== null ? (
        <ShapeProfile shape={tempShape} index={numShapes} fadeIn/>
    ) : null
}


export default TempShapeProfile;