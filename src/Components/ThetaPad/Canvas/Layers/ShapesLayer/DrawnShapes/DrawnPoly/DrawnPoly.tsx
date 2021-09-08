/** DrawnPoly.tsx
 * @file Konva Line drawn with the passed Poly shape
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */

import React from "react";
import {Poly, PolyUtils} from "../../../../../../../types/shapes";
import {Line as KonvaLine} from "react-konva";
import AngleLabels from "./AngleLabels";
import LengthLabels from "./LengthLabels";
import {usePolySegments} from "../../../../../../../hooks/usePolySegments";


interface DrawnPolyProps {
    line: Poly;
}

/**
 * Konva Line and map of segment-length text items
 * @param {Poly} line - Poly line to render
 * @return {JSX.Element} - fragment with Konva Line and map of Konva Groups with
 *      Konva Text elements to display the the length of each segment of the
 *      line and the angle between each pair of segments
 */
const DrawnPoly: React.FC<DrawnPolyProps> = ({line}) => {
    const segments = usePolySegments(line);

    return (
        <>

            {/* POLY-LINE */}
            <KonvaLine
                x={0}
                y={0}
                points={PolyUtils.points(line)}
                stroke={line.color}
                strokeWidth={2}
            />

            {/* LENGTH LABELS */}
            <LengthLabels segments={segments} color={line.color}/>

            {/* ANGLE LABELS */}
            <AngleLabels points={line.points} angles={line.angles} color={line.color}/>

        </>
    )
}



export default DrawnPoly;