/** RemovePointHighlight.tsx
 * @file Konva shapes to highlight potential point-removal action
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Layer} from "react-konva";
import {Point, Shape, ShapeUtils} from "../../../../../../types/shapes";
import {connect} from "react-redux";
import {mapShapeToPropsWithSelector} from "../../../../../../redux/slices/shapesSlice";
import RotatingHighlightCircle from "./RotatingHighlightCircle";
import AntMarchLine from "../LengthHighlights/AntMarchLine";


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

    // If the shape is a poly (IT SHOULD BE)
    if (ShapeUtils.isPoly(shape)) {
        const point = shape.points[index];
        const prevPoint: false | Point = index > 0 && shape.points[index - 1];
        const nextPoint: false | Point = index < shape.points.length - 1 && shape.points[index + 1];
        return (
            <Layer>
                <RotatingHighlightCircle point={point} removal/>
                {prevPoint && nextPoint && (
                    <>
                        <AntMarchLine
                            pt1={prevPoint}
                            pt2={nextPoint}
                            color={shape.color}
                            dash={[8, 12]}
                            strokeWidth={2}
                        />
                        <RotatingHighlightCircle
                            point={prevPoint}
                            color={shape.color}
                            r={10}
                            strokeWidth={3}
                        />
                        <RotatingHighlightCircle
                            point={nextPoint}
                            color={shape.color}
                            r={10}
                            strokeWidth={3}
                        />
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