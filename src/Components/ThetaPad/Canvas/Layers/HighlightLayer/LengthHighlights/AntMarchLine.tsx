/** AntMarchLine.tsx
 * @file A shifting dashed line that draws attention
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useEffect, useRef} from "react";
import {Point} from "../../../../../../types/shapes";
import {Line as KonvaLine} from "react-konva";
import Konva from "konva";


interface AntMarchLineProps {
    pt1: Point;
    pt2: Point;
    color?: string;
    strokeWidth?: number;
    dash?: number[];
    opacity?: number;
    speed?: number;
}

const AntMarchLine: React.FC<AntMarchLineProps> = (
    {
        pt1,
        pt2,
        color = "red",
        strokeWidth = 3,
        dash = [8, 12],
        opacity = 1,
        speed = 20
    }
) => {
    const lineRef = useRef<Konva.Line>(null);

    /** create interval to update line dashes */
    useEffect(() => {
        const interval = setInterval(() => {
            if (lineRef.current !== null) {
                lineRef.current.dashOffset((Date.now() / (1000 / speed)) % 1000);
            }
        }, 30)
        return () => clearInterval(interval);
    }, [speed])

    return (
        <KonvaLine
            ref={lineRef}
            points={[pt1.x, pt1.y, pt2.x, pt2.y]}
            stroke={color}
            dash={dash}
            strokeWidth={strokeWidth}
            lineCap={'round'}
            lineJoin={'round'}
            opacity={opacity}
        />
    );
}


export default AntMarchLine;