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

/**
 * Switch component for highlighting lengths of different shape types
 * @param {Shape} shape - the shape to highlight a length of
 * @param {number | null} index - sub-item index for poly segment highlighting
 * @return {JSX.Element | null} - relevant highlight component for the given
 *      shape type, or null if no relevant highlight is implemented
 */
const LengthHighlight: React.FC<LengthHighlightProps> = ({shape, index}) => {
    if (ShapeUtils.isPoly(shape) && typeof index === "number") {
        return <PolyLengthHighlight line={shape} index={index}/>
    }
    else {
        console.error("LengthHighlight rendered for a shape type that has no " +
            "length highlight implementation!")
        return null;
    }
}



export default connect(mapShapeToPropsWithSelector())(LengthHighlight);