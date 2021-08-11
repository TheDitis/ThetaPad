/** ShapeProfile.tsx
 * @file A switch component for the ShapeProfiles of different shape types
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import LineProfile from "./LineProfile";
import {Line, Shape, ShapeKind} from "../../../../../types/shapes";


interface ShapeProfileProps {
    shape: Shape;
    index: number;
}

const ShapeProfile: React.FC<ShapeProfileProps> = ({shape, index}) => {
//    console.log("thisShapeSelector: ", thisShapeSelector)
//    const shape = useSelector(thisShapeSelector);

    if (shape.kind === ShapeKind.Line) {
        const line = shape as Line;
        return <LineProfile line={line} index={index}/>
    }
//    if (shape.isPoly()) {
//        return <PolyLineProfile line={shape} index={index}/>
//    }
//    if (shape.isCircle()) {
//        return <CircleProfile circle={shape} index={index}/>
//    }
    return null;
}


export default ShapeProfile;

//export default React.memo(
//    ShapeProfile,
//    (prev, next) => {
//        console.log("length: ", LineUtils.length_(prev.shape as Line))
//        console.log("prev: ", prev);
//        console.log("next: ", next);
//        console.log("prev.shape === next.shape: ", prev.shape === next.shape);
//
//        return prev.shape === next.shape && prev.shapeId === next.shapeId && prev.index === next.index
//    }
//);