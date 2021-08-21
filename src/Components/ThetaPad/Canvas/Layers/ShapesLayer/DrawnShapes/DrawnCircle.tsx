/** DrawnCircle.tsx
 * @file Konva Circle shape with radius line (Konva Line)
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Circle, CircleUtils} from "../../../../../../types/shapes";
import {Circle as KonvaCircle} from "react-konva";
import DrawnLine from "./DrawnLine";


interface DrawnCircleProps {
    circle: Circle;
}

/**
 * Konva Circle with radius/diameter line
 * @param {Circle} circle - Circle to draw
 * @return {JSX.Element} - fragment containing Konva Circle and DrawnLine
 */
const DrawnCircle: React.FC<DrawnCircleProps> = ({circle}) => {
    const sizeLine = CircleUtils.sizeLine(circle, false);

    return (
        <>
            <KonvaCircle
                x={circle.origin.x}
                y={circle.origin.y}
                radius={circle.r}
                stroke={circle.color}
                strokeWidth={2}
            />
            <DrawnLine line={sizeLine}/>
        </>
    )
}


export default DrawnCircle;