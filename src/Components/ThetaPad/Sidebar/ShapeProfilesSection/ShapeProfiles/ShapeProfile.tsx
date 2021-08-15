/** ShapeProfile.tsx
 * @file A switch component for the ShapeProfiles of different shape types
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import LineProfile from "./LineProfile";
import {Line, Shape, ShapeUtils} from "../../../../../types/shapes";
import PolyLineProfile from "./PolyLineProfile";
import CircleProfile from "./CircleProfile";

interface ShapeProfileProps {
    shape: Shape;
    index: number;
}

const ShapeProfile: React.FC<ShapeProfileProps> = ({shape, index}) => {

    if (ShapeUtils.isLine(shape)) {
        const line = shape as Line;
        return <LineProfile line={line} index={index}/>
    }
    if (ShapeUtils.isPoly(shape)) {
        return <PolyLineProfile line={shape} index={index}/>
    }
    if (ShapeUtils.isCircle(shape)) {
        return <CircleProfile circle={shape} index={index}/>;
    }
    return null;
}


export default ShapeProfile;
