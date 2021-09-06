/** AngleLabels.tsx
 * @file Konva text angle labels for poly-lines
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useMemo} from "react";
import {Point, Vector} from "../../../../../../../types/shapes";
import * as math from "mathjs";
import {angleOfVector, setVectorMagnitude, unitVector} from "../../../../../../../utils/utils";
import {Group as KonvaGroup, Text as KonvaText} from "react-konva";


interface AngleLabelData {
    angle: number;
    angleText: string;
    mid: Vector;
    pt: Point
}

const calculateAllLabels = (angles: number[], points: Point[]): AngleLabelData[] => (
    angles.map((angle, i) => {
        const angleText = angle.toFixed(0) + '°';

        // get the adjacent segments as vectors
        const [pt1, pt2, pt3] = points.slice(i, i + 3)
        const vec1: Vector = [pt1.x - pt2.x, pt1.y - pt2.y];
        const vec2: Vector = [pt3.x - pt2.x, pt3.y - pt2.y];

        // vector with angle halfway between the two adjacent segments
        let mid: Vector = math.add(
            unitVector(vec1),
            unitVector(vec2)
        ) as Vector;
        // scale the mid-angle vector to be about 30 px in magnitude
        mid = setVectorMagnitude(mid, 30);

        return {
            angle,
            angleText,
            mid,
            pt: pt2,
        } as AngleLabelData;
    })
)


interface AngleLabelsProps {
    points: Point[];
    angles: number[];
    color: string
}

const AngleLabels: React.FC<AngleLabelsProps> = ({points, angles, color}) => {
    // so color change isn't crazy slow
    const labelsData = useMemo(
        () => calculateAllLabels(angles, points),
        [points, angles]
    )

    return (
        <>
            {labelsData.map(({angle, angleText, mid, pt}) => {

                // if the angle is too narrow to fit the text, move it outside
                const flipLabel = angle < 40

                return (
                    <KonvaGroup
                        x={pt.x}
                        y={pt.y}
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
                                fill={color}
                                align={"middle"}
                            />
                        </KonvaGroup>
                    </KonvaGroup>
                )
            })}
        </>
    )
}

export default React.memo(AngleLabels);