/** DrawnCircle.tsx
 * @file Konva Circle shape with radius line (Konva Line)
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Circle, CircleUtils} from "../../../../../../types/shapes";
import {Circle as KonvaCircle, Line as KonvaLine, Group as KonvaGroup} from "react-konva";


interface DrawnCircleProps {
    circle: Circle;
}

const DrawnCircle: React.FC<DrawnCircleProps> = ({circle}) => {
    const sizeLinePoints = CircleUtils.sizeLinePoints(circle, false);

    return (
        <>
            <KonvaCircle
                x={circle.origin.x}
                y={circle.origin.y}
                radius={circle.r}
                stroke={circle.color}
                strokeWidth={2}
            />
            <KonvaLine
                x={0}
                y={0}
                points={sizeLinePoints}
                stroke={circle.color}
                strokeWidth={2}
            />
            <KonvaGroup
            >

            </KonvaGroup>
        </>
    )
}


export default DrawnCircle;