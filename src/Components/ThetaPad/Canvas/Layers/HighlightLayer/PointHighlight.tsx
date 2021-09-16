/** PointHighlight.tsx
 * @file Highlight a point on any shape
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {connect} from "react-redux";
import {mapShapeToPropsWithSelector} from "../../../../../redux/slices/shapesSlice";
import {Shape, ShapeUtils} from "../../../../../types/shapes";
import PolyPointHighlight from "./PolyPointHighlight";


interface PointHighlightProps {
    shape: Shape;
    shapeId: string;
    index: number | null;
}

const PointHighlight: React.FC<PointHighlightProps> = ({shape, index}) => {
    if (ShapeUtils.isPoly(shape)) {
        return <PolyPointHighlight line={shape} shapeId={shape.id} index={index as number}/>
    }
    else return null;
}


export default connect(mapShapeToPropsWithSelector())(PointHighlight);