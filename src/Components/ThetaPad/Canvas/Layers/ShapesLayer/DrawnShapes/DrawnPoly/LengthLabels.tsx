/** LengthLabels.tsx
 * @file Konva text fragment for poly-lines
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {PointUtils, PolySegment} from "../../../../../../../types/shapes";
import {useAppSelector} from "../../../../../../../redux/hooks";
import {unitValSelector} from "../../../../../../../redux/selectors";
import {formatLengthText} from "../../../../../../../utils/utils";
import {Group as KonvaGroup, Text as KonvaText} from "react-konva";
import {LINE_INFO_TEXT_OFFSET} from "../../../../../../../constants";


interface LengthLabelsProps {
    segments: PolySegment[],
    color: string
}

const LengthLabels: React.FC<LengthLabelsProps> = ({segments, color}) => {

    const unit = useAppSelector(unitValSelector);
    return (
        <>
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
                            fill={color}
                        />
                    </KonvaGroup>
                )
            })}
        </>
    )
}

export default React.memo(
    LengthLabels,
    (p, n) => {
        const pLen = p.segments.length;
        const nLen = n.segments.length;

        return (
            p.color === n.color
            && pLen === nLen
            && p.segments[pLen - 1].length === n.segments[nLen - 1].length
        )
    }
);