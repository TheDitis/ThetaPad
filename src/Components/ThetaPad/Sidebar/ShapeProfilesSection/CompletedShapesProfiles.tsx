/** CompletedShapesProfiles.tsx
 * @file Memoized fragment of all ShapeProfiles of shapes that have been completed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import uuid from "react-uuid";
import ShapeProfile from "./ShapeProfiles/ShapeProfile";
import {useSelector} from "react-redux";
import {shapesSelector} from "../../../../redux/selectors";


interface CompletedShapesProfilesProps {
}


const CompletedShapesProfiles: React.FC<CompletedShapesProfilesProps> = () => {
    const shapes = useSelector(shapesSelector);

    return (
        <>
            {Object.entries(shapes).map(([id, shape], index) => (
                <ShapeProfile key={uuid()} shape={shape} index={index}/>
            ))}
        </>
    )
}


export default CompletedShapesProfiles;
