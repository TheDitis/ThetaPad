/** DrawnShape.tsx
 * @file Component that returns the relevant Konva shape to shape passed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Shape, ShapeUtils} from "../../../../../../types/shapes";
import DrawnLine from "./DrawnLine";
import DrawnPoly from "./DrawnPoly";
import DrawnCircle from "./DrawnCircle";


interface DrawnShapeProps {
    shape: Shape;
}


/**
 * Returns a Konva shape with the passed Shape object
 * @param {Shape} shape - the shape you want drawn on the canvas
 */
const DrawnShape: React.FC<DrawnShapeProps> = ({shape}) => {

    if (ShapeUtils.isLine(shape)) {
        return <DrawnLine line={shape}/>
    }
    if (ShapeUtils.isPoly(shape)) {
        return <DrawnPoly line={shape}/>
    }
    if (ShapeUtils.isCircle(shape)) {
        return <DrawnCircle circle={shape}/>
    }
    return null;
}

export default DrawnShape;
