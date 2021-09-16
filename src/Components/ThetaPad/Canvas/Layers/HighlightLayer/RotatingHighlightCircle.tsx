/** PointHighlight.tsx
 * @file rotating Konva Circle to highlight a selected point
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useEffect, useRef} from "react";
import {Circle as KonvaCircle, Group} from "react-konva";
import Konva from "konva";
import {Point} from "../../../../../types/shapes";
import {Line as KonvaLine} from "react-konva";


interface PointHighlightProps {
    point: Point;
    removal?: boolean;
    color?: string;
    r?: number;
    strokeWidth?: number;
}

/**
 * Rotating dotted Konva Circle to highlight a particular point
 * @param {Point} point - center of the highlight circle
 * @param {boolean} [removal=false] - if true, a red x will appear in the circle
 * @param {string} [color="red"] - color of the circle
 * @param {number} [r=17] - radius of the circle
 * @param {number} [strokeWidth=2] - width of the circle's outer line
 * @return {JSX.Element} - Fragment with a Konva Circle, and X Lines if removal=true
 */
const RotatingHighlightCircle: React.FC<PointHighlightProps> = (
    {
        point,
        removal = false,
        color= "red",
        r = 17,
        strokeWidth = 2,
    }
) => {
    const ref = useRef<Konva.Circle>(null);

    /** create interval to update circle rotation */
    useEffect(() => {
        const interval = setInterval(() => {
            if (ref.current !== null) {
                ref.current.dashOffset((Date.now() / 100) % 1000);
            }
        }, 30)
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <KonvaCircle
                ref={ref}
                x={point.x}
                y={point.y}
                radius={r}
                stroke={color}
                dash={[4, 8]}
                dashOffset={30}
                lineCap={"round"}
                lineJoin={"round"}
                strokeWidth={strokeWidth}
            />
            {removal && (
                <Group x={point.x} y={point.y}>
                    <KonvaLine
                        points={[-7, -7, 7, 7]}
                        stroke={"red"}
                        strokeWidth={4}
                        lineCap={'round'}
                    />
                    <KonvaLine
                        points={[-7, 7, 7, -7]}
                        stroke={"red"}
                        strokeWidth={4}
                        lineCap={'round'}
                    />
                </Group>
            )}
        </>
    )
}


export default RotatingHighlightCircle;