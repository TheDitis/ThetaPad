/** CompletedShapesProfiles.tsx
 * @file Memoized fragment of all ShapeProfiles of shapes that have been completed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {MemoizedShapeProfile} from "./ShapeProfiles/ShapeProfile";
import {shapesIdsSelector} from "../../../../redux/selectors";
import {useAppSelector} from "../../../../hooks/reduxHooks";


/** Fragment of ShapeProfiles for all completed shapes */
const CompletedShapesProfiles: React.FC = () => {
    const shapeIds = useAppSelector(shapesIdsSelector);

    return (
        <>
            {shapeIds.map((id, index) => (
                <MemoizedShapeProfile key={id} shapeId={id} index={index}/>
            ))}
        </>
    )
}


export default CompletedShapesProfiles;
