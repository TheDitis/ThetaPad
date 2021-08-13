//export {}
/** DrawnShape.tsx
 * @file Component that returns the relevant Konva shape to shape passed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Line as KonvaLine} from "react-konva";
import React from "react";
import {LineUtils, PolyUtils, Shape, ShapeUtils} from "../../../../../types/shapes";


interface DrawnShapeProps {
    shape: Shape;
}


/**
 * Returns a Konva shape with the passed Shape object
 * @param {Shape} shape - the shape you want drawn on the canvas
 */
const DrawnShape: React.FC<DrawnShapeProps> = ({shape}) => {

    if (ShapeUtils.isLine(shape)) {
        return (
            <KonvaLine
                x={0}
                y={0}
                points={LineUtils.points(shape)}
                stroke={shape.color}
                strokeWidth={2}
            />
        )
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
//    if (shape.isCircle()) {
//        return (
//            <KonvaCircle
//                x={shape.origin.canvasX}
//                y={shape.origin.canvasY}
//                radius={shape.r}
//                stroke={shape.color}
//                strokeWidth={2}
//            />
//        )
//    }
    return null;
}

export default DrawnShape;
