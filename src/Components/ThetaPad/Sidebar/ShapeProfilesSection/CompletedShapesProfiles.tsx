/** CompletedShapesProfiles.tsx
 * @file Memoized fragment of all ShapeProfiles of shapes that have been completed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {ShapeMap} from "../../types/shapes";
import LineProfile from "./ShapeProfiles/LineProfile";
import uuid from "react-uuid";


interface CompletedShapesProfilesProps {shapes: ShapeMap}

const CompletedShapesProfiles: React.FC<CompletedShapesProfilesProps> = ({shapes}) => (
    <>
        {Object.entries(shapes).map(([id, shape], index) => {
            if (shape.isLine()) {
                return <LineProfile key={uuid()} line={shape} index={index}/>
            }
            return null;
        })}
    </>
)


export default React.memo(CompletedShapesProfiles);