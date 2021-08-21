/** DrawnPoly.tsx
 * @file Konva Line drawn with the passed Poly shape
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */

import React from "react";
import {useSelector} from "react-redux";
import {unitValSelector} from "../../../../../../redux/selectors";
import {LineUtils, Poly, PolyUtils} from "../../../../../../types/shapes";
import {Group as KonvaGroup, Line as KonvaLine, Text as KonvaText} from "react-konva/ReactKonvaCore";
import {LINE_INFO_TEXT_OFFSET} from "../../../../../constants";

interface DrawnPolyProps {
    line: Poly;
}

const DrawnPoly: React.FC<DrawnPolyProps> = ({line}) => {
    const unit = useSelector(unitValSelector);
    // const midPoint = LineUtils.midPoint(line);
    //
    // let lengthText = (LineUtils.length_(line) / unit)
    //     .toFixed(unit === 1 ? 0 : 2);
    //
    // // Remove unnecessary trailing decimal places
    // if (lengthText.includes('.')) {
    //     lengthText = _.dropRightWhile(lengthText, (char) => ['.', '0'].includes(char)).join("")
    // }
    //
    // let angle = LineUtils.angle(line);
    // const flipText = angle < -90 || angle > 90;
    // if (flipText) angle += 180

    return (
        <>
            <KonvaLine
                x={0}
                y={0}
                points={PolyUtils.points(line)}
                stroke={line.color}
                strokeWidth={2}
            />
            {/*<KonvaGroup*/}
            {/*    x={midPoint.x}*/}
            {/*    y={midPoint.y}*/}
            {/*    rotation={angle}*/}
            {/*>*/}
            {/*    <KonvaText*/}
            {/*        x={-10}*/}
            {/*        y={LINE_INFO_TEXT_OFFSET}*/}
            {/*        text={lengthText}*/}
            {/*        fontSize={15}*/}
            {/*        fill={line.color}*/}
            {/*    />*/}
            {/*</KonvaGroup>*/}
        </>
    )
}


export default DrawnPoly;