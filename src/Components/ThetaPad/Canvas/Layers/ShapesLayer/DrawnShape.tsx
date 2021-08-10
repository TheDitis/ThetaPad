export {}
///** DrawnShape.tsx
// * @file Component that returns the relevant Konva shape to shape passed
// * @author Ryan McKay <ryanscottmckay@gmail.com>
// */
//import {Line as KonvaLine} from "react-konva";
//import {Circle as KonvaCircle} from "react-konva";
//import React from "react";
//import {ShapeType} from "../../../types/shapes";
//
//
//interface DrawnShapeProps {
//    shape: ShapeType;
//}
//
//
///**
// * Returns a Konva shape with the passed ShapeType object
// * @param {ShapeType} shape - the shape you want drawn on the canvas
// */
//const DrawnShape: React.FC<DrawnShapeProps> = ({shape}) => {
//    if (shape.isLine()) {
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
//    return null;
//}
//
//export default DrawnShape;
