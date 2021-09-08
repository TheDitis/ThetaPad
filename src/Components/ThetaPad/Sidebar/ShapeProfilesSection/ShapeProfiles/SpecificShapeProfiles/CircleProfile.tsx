/** CircleProfile.tsx
 * @file A profile specifically for Circle shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import ShapeProfileBase from "../ShapeProfileBase/ShapeProfileBase";
import {Circle} from "../../../../../../types/shapes";


interface CircleProfileProps {
    circle: Circle;
    index: number;
    fadeIn?: boolean;
}

/**
 * ShapeProfile subtype specific to Circle objects
 * @param {Circle} circle - Circle object this profile will be linked to
 * @param {number} index - the index of this ShapeProfile in the rendered array
 * @param {boolean} [fadeIn] - whether or not the profile should animate in
 * @return {JSX.Element} - profile for the given Circle object
 */
const CircleProfile: React.FC<CircleProfileProps> = ({circle, index, fadeIn}) => (
    <ShapeProfileBase
        shape={circle}
        index={index}
        fadeIn={fadeIn}
        unitValue={circle.r}
        infoItems={['r']}
    />
)


export default CircleProfile;