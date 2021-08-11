/** CompletedShapesProfiles.tsx
 * @file Memoized fragment of all ShapeProfiles of shapes that have been completed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import uuid from "react-uuid";
import ShapeProfile from "./ShapeProfiles/ShapeProfile";
import {useSelector} from "react-redux";
import {shapesSelector} from "../../../../redux/selectors";

//const CompletedShapeProfile = connect(mapShapeToPropsWithSelector)(ShapeProfile);

interface CompletedShapesProfilesProps {}

const CompletedShapesProfiles: React.FC<CompletedShapesProfilesProps> = (props) => {
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


//export default React.memo(
//    CompletedShapesProfiles,
//    (prev, next) => {
//        const prevIds = Object.keys(prev.shapes);
//        const nextIds = Object.keys(prev.shapes);
//        console.log(prevIds)
//        console.log(nextIds)
//        if (prevIds.length !== nextIds.length) {
//            console.log("shape added or removed")
//            return false;
//        }
//        for (let [id1, id2] of _.zip(prevIds, nextIds)) {
//            console.log(id1, id2)
//            console.log(id1 === id2)
//            if (id1 !== id2) return false;
//        }
//        return true;
//    }
//);