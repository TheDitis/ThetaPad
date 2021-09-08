/** LengthLabels.tsx
 * @file Konva text fragment for poly-lines
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useMemo} from "react";
import {Point, PointUtils, PolySegment} from "../../../../../../../types/shapes";
import {useAppSelector} from "../../../../../../../hooks/reduxHooks";
import {unitValSelector} from "../../../../../../../redux/selectors";
import {formatLengthText} from "../../../../../../../utils/utils";
import {Group as KonvaGroup, Text as KonvaText} from "react-konva";
import {LINE_INFO_TEXT_OFFSET} from "../../../../../../../constants";


interface LengthLabelData {
    midPoint: Point;
    angle: number;
    text: string;
}

const calculateLengthLabels = (segments: PolySegment[], unit: number): LengthLabelData[] => (
    segments.map((segment) => {
        const midPoint = PointUtils.midPoint(segment.start, segment.end);
        let lengthText = formatLengthText(
            (PointUtils.distance(segment.start, segment.end) / unit),
            unit !== 1,
            2
        )
        const flipText = segment.angle < -90 || segment.angle > 90;
        let angle = flipText ? segment.angle + 180 : segment.angle;
        return {
            midPoint,
            angle,
            text: lengthText,
        }
    })
)


interface LengthLabelsProps {
    segments: PolySegment[],
    color: string
}

const LengthLabels: React.FC<LengthLabelsProps> = ({segments, color}) => {
    const unit = useAppSelector(unitValSelector);
    const lengthLabels = useMemo(
        () => calculateLengthLabels(segments, unit),
        [segments, unit]
    )

    return (
        <>
            {lengthLabels.map(({midPoint, angle, text}) => (
                <KonvaGroup
                    x={midPoint.x}
                    y={midPoint.y}
                    rotation={angle}
                    key={midPoint.x.toString() + "-" + midPoint.y.toString()}
                >
                    <KonvaText
                        x={-10}
                        y={LINE_INFO_TEXT_OFFSET}
                        text={text}
                        fontSize={15}
                        fill={color}
                    />
                </KonvaGroup>
                )
            )}
        </>
    )
}

export default LengthLabels;