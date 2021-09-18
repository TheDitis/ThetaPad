/** PolyLengthHighlight.tsx
 * @file Highlights segment of a poly shape on the canvas
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Poly, PolyUtils} from "../../../../../../types/shapes";
import {Layer} from "react-konva";
import AntMarchLine from "./AntMarchLine";


interface PolyLengthHighlightProps {
    line: Poly;
    index: number;
}

/**
 * Highlight layer that renders an AntMarchLine over a given segment
 * @param {Poly} line - The poly line to highlight a segment of
 * @param {number} index - The index of the segment to highlight
 * @return {JSX.Element} - Konva Layer with an AntMarchLine
 */
const PolyLengthHighlight: React.FC<PolyLengthHighlightProps> = ({line,index}) => {
    const {start, end} = PolyUtils.getSegment(line, index);

    return (
        <Layer>
            <AntMarchLine
                pt1={start}
                pt2={end}
                color={line.color}
                strokeWidth={4}
                speed={50}
                dash={[8, 10]}
            />
        </Layer>
    )

}


export default PolyLengthHighlight;