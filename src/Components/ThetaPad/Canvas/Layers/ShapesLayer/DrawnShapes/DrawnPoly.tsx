/** DrawnPoly.tsx
 * @file Konva Line drawn with the passed Poly shape
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */

import React from "react";
import {unitValSelector} from "../../../../../../redux/selectors";
import {PointUtils, Poly, PolyUtils} from "../../../../../../types/shapes";
import {Group as KonvaGroup, Line as KonvaLine, Text as KonvaText} from "react-konva";
import {LINE_INFO_TEXT_OFFSET} from "../../../../../../constants";
import {formatLengthText} from "../../../../../../utils/utils";
import {useAppSelector} from "../../../../../../redux/hooks";

interface DrawnPolyProps {
    line: Poly;
}

/**
 * Konva Line and map of segment-length text items
 * @param {Poly} line - Poly line to render
 * @return {JSX.Element} - fragment with Konva Line and map of Konva Groups with Konva Text elements to display the
 *      the length of each segment of the line
 */
const DrawnPoly: React.FC<DrawnPolyProps> = ({line}) => {
    const unit = useAppSelector(unitValSelector);

    const segments = PolyUtils.asSegments(line);

    return (
        <>
            <KonvaLine
                x={0}
                y={0}
                points={PolyUtils.points(line)}
                stroke={line.color}
                strokeWidth={2}
            />
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

        </>
    )
}


export default DrawnPoly;