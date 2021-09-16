/** RemovePointHighlight.tsx
 * @file Konva shapes to highlight potential point-removal action
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useEffect, useRef} from "react";
import {Layer, Line as KonvaLine} from "react-konva";
import {Point, Shape, ShapeUtils} from "../../../../../types/shapes";
import {connect} from "react-redux";
import {mapShapeToPropsWithSelector} from "../../../../../redux/slices/shapesSlice";
import Konva from "konva";
import PointHighlight from "./PointHighlight";


interface RemovePointHighlightProps {
    shapeId: string;
    shape: Shape;
    index: number;
}

/**
 * Preview for potential remove-poly-point action
 * @param {Shape} shape - the target poly-line object
 * @param {number} index - index of the selected point in the line
 * @return {JSX.Element | null} - Konva layer with rotating dashed-circle with
 *      an x through it. If the point isn't the first or last, it will also
 *      render a moving dotted line joining the adjacent points
 */
const RemovePolyPointHighlight: React.FC<RemovePointHighlightProps> = ({shape, index}) => {
    const lineRef = useRef<Konva.Line>(null);

    /** create interval to update line dashes */
    useEffect(() => {
        const interval = setInterval(() => {
                if (lineRef.current !== null) {
                    lineRef.current.dashOffset((Date.now() / 50) % 360);
                }
        }, 30)
        return () => clearInterval(interval);
    }, [])

    // If the shape is a poly (IT SHOULD BE)
    if (ShapeUtils.isPoly(shape)) {
        const point = shape.points[index];
        const prevPoint: false | Point = index > 0 && shape.points[index - 1];
        const nextPoint: false | Point = index < shape.points.length - 1 && shape.points[index + 1];
        return (
            <Layer>
                <PointHighlight point={point} removal/>
                {prevPoint && nextPoint && (
                    <>
                        <KonvaLine
                            ref={lineRef}
                            points={[prevPoint.x, prevPoint.y, nextPoint.x, nextPoint.y]}
                            stroke={shape.color}
                            dash={[8, 12]}
                            strokeWidth={2}
                            lineCap={'round'}
                            lineJoin={'round'}
                            opacity={1}
                        />
                        <PointHighlight point={prevPoint} color={shape.color} r={10} strokeWidth={3}/>
                        <PointHighlight point={nextPoint} color={shape.color} r={10} strokeWidth={3}/>
                    </>
                )}
            </Layer>
        )
    }
    // If the shape is not a Poly, log an error and return null
    else {
        console.error("RemovePolyPointHighlight was given a non-poly shape!")
        return null;
    }
}

export default connect(mapShapeToPropsWithSelector())(RemovePolyPointHighlight);