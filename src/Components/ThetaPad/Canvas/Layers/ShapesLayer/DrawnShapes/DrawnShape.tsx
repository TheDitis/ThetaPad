/** DrawnShape.tsx
 * @file Component that returns the relevant Konva shape to shape passed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Circle as KonvaCircle} from "react-konva";
import React from "react";
import {Shape, ShapeUtils} from "../../../../../../types/shapes";
import DrawnLine from "./DrawnLine";
import DrawnPoly from "./DrawnPoly";


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
        return (
            <KonvaCircle
                x={shape.origin.x}
                y={shape.origin.y}
                radius={shape.r}
                stroke={shape.color}
                strokeWidth={2}
            />
        )
    }
    return null;
}

export default DrawnShape;
