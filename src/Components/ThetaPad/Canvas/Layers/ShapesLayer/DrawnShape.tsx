//export {}
/** DrawnShape.tsx
 * @file Component that returns the relevant Konva shape to shape passed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Line as KonvaLine} from "react-konva";
import React, {useContext} from "react";
import {LineUtils, Line, ShapeKind, Shape} from "../../../types/shapes";
import {SizeContext} from "../../../../App/AppContextProvider";


interface DrawnShapeProps {
    shape: Shape;
}


/**
 * Returns a Konva shape with the passed Shape object
 * @param {Shape} shape - the shape you want drawn on the canvas
 */
const DrawnShape: React.FC<DrawnShapeProps> = ({shape}) => {
    const {navbar, sidebar} = useContext(SizeContext)

    if (shape.kind === ShapeKind.Line) {
        const line: Line = shape as Line;
        return (
            <KonvaLine
                x={0}
                y={0}
                points={LineUtils.pointsTranslated(line, -sidebar, -navbar)}
                stroke={line.color}
                strokeWidth={2}
            />
        )
    }
//    if (shape.isPoly()) {
//        return (
//            <KonvaLine
//                x={0}
//                y={0}
//                points={shape.canvasPoints}
//                stroke={shape.color}
//                strokeWidth={2}
//            />
//        )
//    }
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
