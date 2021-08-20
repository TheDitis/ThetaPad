/** DrawnLine.tsx
 * @file Konva Line component rendered by DrawnShape for Line shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Line, LineUtils} from "../../../../../../types/shapes";
import {Line as KonvaLine, Group as KonvaGroup, Text as KonvaText} from "react-konva";
import {useSelector} from "react-redux";
import {unitValSelector} from "../../../../../../redux/selectors";
import _ from "lodash";

interface DrawnLineProps {
    line: Line
}

const DrawnLine: React.FC<DrawnLineProps> = ({line}) => {
    const unit = useSelector(unitValSelector);
    const midPoint = LineUtils.midPoint(line);

    let lengthText = (LineUtils.length_(line) / unit)
        .toFixed(unit === 1 ? 0 : 2);

    // Remove unnecessary trailing decimal places
    if (lengthText.includes('.')) {
        lengthText = _.dropRightWhile(lengthText, (char) => ['.', '0'].includes(char)).join("")
    }

    return (
        <>
            <KonvaLine
                x={0}
                y={0}
                points={LineUtils.points(line)}
                stroke={line.color}
                strokeWidth={2}
            />
            <KonvaGroup
                x={midPoint.x}
                y={midPoint.y}
                rotation={LineUtils.angle(line)}
            >
                <KonvaText
                    x={-10}
                    y={5}
                    text={lengthText}
                    fontSize={15}
                    fill={line.color}
                />
            </KonvaGroup>
        </>
    )
}


export default DrawnLine;