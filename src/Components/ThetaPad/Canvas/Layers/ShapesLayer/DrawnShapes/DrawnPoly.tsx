/** DrawnPoly.tsx
 * @file Konva Line drawn with the passed Poly shape
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */

import React from "react";
import {unitValSelector} from "../../../../../../redux/selectors";
import {PointUtils, Poly, PolyUtils, Vector} from "../../../../../../types/shapes";
import {Group as KonvaGroup, Line as KonvaLine, Text as KonvaText} from "react-konva";
import {LINE_INFO_TEXT_OFFSET} from "../../../../../../constants";
import {angleOfVector, formatLengthText, setVectorMagnitude, unitVector} from "../../../../../../utils/utils";
import {useAppSelector} from "../../../../../../redux/hooks";
import * as math from "mathjs";

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
    const unit = useAppSelector(unitValSelector);

    const segments = PolyUtils.asSegments(line);

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
            {segments.map((segment) => {
                const midPoint = PointUtils.midPoint(segment.start, segment.end);
                let lengthText = formatLengthText(
                    (PointUtils.distance(segment.start, segment.end) / unit),
                    unit !== 1,
                    2
                )
                const flipText = segment.angle < -90 || segment.angle > 90;
                if (flipText) segment.angle += 180

                return (
                    <KonvaGroup
                        x={midPoint.x}
                        y={midPoint.y}
                        rotation={segment.angle}
                        key={midPoint.x.toString() + "-" + midPoint.y.toString()}
                    >
                        <KonvaText
                            x={-10}
                            y={LINE_INFO_TEXT_OFFSET}
                            text={lengthText}
                            fontSize={15}
                            fill={line.color}
                        />
                    </KonvaGroup>
                )
            })}

            {/* ANGLE LABELS */}
            {line.angles.map((angle, i) => {
                const angleText = angle.toFixed(0) + '°';

                // get the adjacent segments as vectors
                const [pt1, pt2, pt3] = line.points.slice(i, i + 3)
                const vec1: Vector = [pt1.x - pt2.x, pt1.y - pt2.y];
                const vec2: Vector = [pt3.x - pt2.x, pt3.y - pt2.y];

                // vector with angle halfway between the two adjacent segments
                let mid: Vector = math.add(
                    unitVector(vec1),
                    unitVector(vec2)
                ) as Vector;
                // scale the mid-angle vector to be about 30 px in magnitude
                mid = setVectorMagnitude(mid, 30);

                // if the angle is too narrow to fit the text, move it outside
                const flipLabel = angle < 40

                return (
                    <KonvaGroup
                        x={pt2.x}
                        y={pt2.y}
                        key={angle.toString() + "AngleText"}
                    >
                        <KonvaGroup
                            x={flipLabel ? -mid[0] : mid[0]}
                            y={flipLabel ? -mid[1] : mid[1]}
                            width={0}
                            rotation={-angleOfVector(mid)}
                            align={"middle"}
                        >
                            <KonvaText
                                x={-(angleText.length * 3.2)}
                                width={300}
                                text={angleText}
                                fontSize={15}
                                fill={line.color}
                                align={"middle"}
                            />
                        </KonvaGroup>
                    </KonvaGroup>
                )
            })}

        </>
    )
}


export default DrawnPoly;