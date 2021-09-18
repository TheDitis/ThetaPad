/** LengthHighlight.tsx
 * @file Switch for highlighting lengths of different shape types
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Shape, ShapeUtils} from "../../../../../../types/shapes";
import {connect} from "react-redux";
import {mapShapeToPropsWithSelector} from "../../../../../../redux/slices/shapesSlice";
import PolyLengthHighlight from "./PolyLengthHighlight";


interface LengthHighlightProps {
    shapeId: string;
    shape: Shape;
    index: number | null;
}

const LengthHighlight: React.FC<LengthHighlightProps> = ({shape, index}) => {
    if (ShapeUtils.isPoly(shape) && typeof index === "number") {
        return <PolyLengthHighlight shape={shape} index={index}/>
    }
    else {
        return null;
    }
}



export default connect(mapShapeToPropsWithSelector())(LengthHighlight);