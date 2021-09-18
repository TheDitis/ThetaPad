/** PointHighlight.tsx
 * @file Highlight a point on any shape
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {connect} from "react-redux";
import {mapShapeToPropsWithSelector} from "../../../../../../redux/slices/shapesSlice";
import {Shape, ShapeUtils} from "../../../../../../types/shapes";
import PolyPointHighlight from "./PolyPointHighlight";


interface PointHighlightProps {
    shape: Shape;
    shapeId: string;
    index: number | null;
}

/**
 * Switch component that returns point-highlight component for a given shape type,
 * or null if none is implemented for that shape type
 * @param {Shape} shape
 * @param {number | null} index
 * @return {JSX.Element | null}
 * @constructor
 */
const PointHighlight: React.FC<PointHighlightProps> = ({shape, index}) => {
    if (ShapeUtils.isPoly(shape)) {
        return <PolyPointHighlight line={shape} shapeId={shape.id} index={index as number}/>
    }
    else {
        console.error("PointHighlight rendered with shape that doesn't have " +
            "a point-highlight component implemented.")
        return null;
    }
}


export default connect(mapShapeToPropsWithSelector())(PointHighlight);