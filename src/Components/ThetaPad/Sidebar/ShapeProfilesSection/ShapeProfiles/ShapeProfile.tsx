/** ShapeProfile.tsx
 * @file A switch component for the ShapeProfiles of different shape types
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import LineProfile from "./SpecificShapeProfiles/LineProfile";
import {Line, Shape, ShapeUtils} from "../../../../../types/shapes";
import PolyLineProfile from "./SpecificShapeProfiles/PolyLineProfile/PolyLineProfile";
import CircleProfile from "./SpecificShapeProfiles/CircleProfile";
import {connect} from "react-redux";
import {mapShapeToPropsWithSelector} from "../../../../../redux/slices/shapesSlice";

interface ShapeProfileProps {
    shape: Shape;
    shapeId?: string;
    index: number;
    fadeIn?: boolean;
}

/**
 * ShapeProfile switch component. Returns the profile subtype that matches that
 * of 'shape'
 * @param {Shape} shape - Shape object the profile will be linked to
 * @param {number} index - index of this shape in the rendered array
 * @param {boolean} [fadeIn=false] - whether or not the profile should animate in
 * @return {JSX.Element | null} - LineProfile, PolyLineProfile, or CircleProfile
 *      based on the type of 'shape', null if the shape is an invalid type
 */
const ShapeProfile: React.FC<ShapeProfileProps> = ({index, shape, fadeIn = false}) => {
    if (ShapeUtils.isLine(shape)) {
        const line = shape as Line;
        return <LineProfile line={line} index={index} fadeIn={fadeIn}/>
    }
    if (ShapeUtils.isPoly(shape)) {
        return <PolyLineProfile line={shape} index={index} fadeIn={fadeIn}/>
    }
    if (ShapeUtils.isCircle(shape)) {
        return <CircleProfile circle={shape} index={index} fadeIn={fadeIn}/>;
    }
    return null;
}


/**
 * Memoized version that takes the passed id (shapeId) and tacks on the corresponding Shape in props
 * This keeps every profile from re-rendering every time a new shape is added or removed
 */
export const MemoizedShapeProfile = React.memo(
    connect(mapShapeToPropsWithSelector())(ShapeProfile),
    (prev, next) => (
        prev.index === next.index && prev.shapeId === next.shapeId
    )
)


export default ShapeProfile