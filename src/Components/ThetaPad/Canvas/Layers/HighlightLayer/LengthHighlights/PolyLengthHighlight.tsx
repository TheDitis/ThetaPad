/** PolyLengthHighlight.tsx
 * @file Highlights segment of a poly shape on the canvas
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Poly, PolyUtils} from "../../../../../../types/shapes";
import {Layer} from "react-konva";
import AntMarchLine from "./AntMarchLine";


interface PolyLengthHighlightProps {
    shape: Poly;
    index: number;
}

const PolyLengthHighlight: React.FC<PolyLengthHighlightProps> = ({shape,index}) => {
    const segment = PolyUtils.getSegment(shape, index);
    return (
        <Layer>
            <AntMarchLine
                pt1={segment.start}
                pt2={segment.end}
                color={shape.color}
                strokeWidth={5}
                speed={50}
            />
        </Layer>
    )

}


export default PolyLengthHighlight;