/** DrawnShapes.tsx
 * @file Component that returns the relevant Konva shape to shape passed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Line as KonvaLine} from "react-konva";
import React from "react";
import {Shape} from "../../../types/shapes";


interface DrawnShapeProps {
    shape: Shape;
}


/**
 * Returns a Konva shape with the passed Shape object
 * @param {Shape} shape - the shape you want drawn on the canvas
 */
const DrawnShape: React.FC<DrawnShapeProps> = ({shape}) => {
    if (shape.isLine()) {
        return (
            <KonvaLine
                x={0}
                y={0}
                points={shape.points}
                stroke={shape.color}
                strokeWidth={2}
            />
        )
    }
    return null;
}

export default DrawnShape;