/** ShapeProfile.tsx
 * @file A switch component for the ShapeProfiles of different shape types
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import LineProfile from "./LineProfile";
import {Line, ShapeKind, Shape} from "../../../types/shapes";


interface ShapeProfileProps {
    shape: Shape;
    index: number;
}

const ShapeProfile: React.FC<ShapeProfileProps> = ({shape, index}) => {
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