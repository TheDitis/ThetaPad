/** DrawnShape.tsx
 * @file Component that returns the relevant Konva shape to shape passed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Circle as KonvaCircle, Line as KonvaLine, Text as KonvaText, Group as KonvaGroup} from "react-konva";
import React from "react";
import {PolyUtils, Shape, ShapeUtils} from "../../../../../../types/shapes";
import DrawnLine from "./DrawnLine";


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
        return (
            <KonvaLine
                x={0}
                y={0}
                points={PolyUtils.points(shape)}
                stroke={shape.color}
                strokeWidth={2}
            />
        )
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
