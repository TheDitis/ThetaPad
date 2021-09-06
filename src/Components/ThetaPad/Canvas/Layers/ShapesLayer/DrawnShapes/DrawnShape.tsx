/** DrawnShape.tsx
 * @file Component that returns the relevant Konva shape to shape passed
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Shape, ShapeUtils} from "../../../../../../types/shapes";
import DrawnLine from "./DrawnLine";
import DrawnPoly from "./DrawnPoly/DrawnPoly";
import DrawnCircle from "./DrawnCircle";
import {mapShapeToPropsWithSelector} from "../../../../../../redux/slices/shapesSlice";
import {connect} from "react-redux";


interface DrawnShapeProps {
    shape: Shape;
    shapeId?: string;
}


/**
 * Returns a Konva shape with the passed Shape object
 * @param {Shape} shape - the shape you want drawn on the canvas
 */
const DrawnShape: React.FC<DrawnShapeProps> = ({shape}) => {

    if (!shape.visible) {
        return null;
    }
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



export const MemoizedDrawnShape = React.memo(
    connect(mapShapeToPropsWithSelector())(DrawnShape),
    (p, n) => (
        p.shapeId === n.shapeId
    )
)