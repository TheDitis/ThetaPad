/** PointHighlight.tsx
 * @file Highlights a particular point on a poly shape
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Layer} from "react-konva";
import {Poly} from "../../../../../../types/shapes";
import RotatingHighlightCircle from "./RotatingHighlightCircle";


interface PointHighlightProps {
    line: Poly;
    shapeId: string;
    index: number;
}

/**
 * Renders a rotating dotted circle over a given point of a given poly line
 * @param {Poly} line - the line to highlight a point of
 * @param {number} index - the index of the point to highlight
 * @return {JSX.Element} - a RotatingHighlightCircle over the specified point
 */
const PolyPointHighlight: React.FC<PointHighlightProps> = ({line, index}) => {
    return (
        <Layer>
            <RotatingHighlightCircle
                point={line.points[index]}
                color={line.color}
                r={12}
                strokeWidth={3}
            />
        </Layer>
    )
}


export default PolyPointHighlight;