/** CompletedShapesProfiles.tsx
 * @file Memoized fragment of all ShapeProfiles of shapes that have been completed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {ShapeMap} from "../../types/shapes";
import uuid from "react-uuid";
import ShapeProfile from "./ShapeProfiles/ShapeProfile";


interface CompletedShapesProfilesProps {shapes: ShapeMap}

const CompletedShapesProfiles: React.FC<CompletedShapesProfilesProps> = ({shapes}) => (
    <>
        {Object.entries(shapes).map(([id, shape], index) => (
            <ShapeProfile key={uuid()} shape={shape} index={index}/>
        ))}
    </>
)


export default React.memo(CompletedShapesProfiles);