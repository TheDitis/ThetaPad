/** CircleProfile.tsx
 * @file A profile specifically for Circle shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import ShapeProfileBase from "../ShapeProfileBase";
import ShapeInfoItem from "../ShapeInfoItem";
import uuid from "react-uuid";
import {Circle} from "../../../../../../types/shapes";

/**
 * Renders information items relevant to Circle objects. Used in CircleProfile
 * only, passed as a prop to ShapeProfileBase
 * @param {Circle} shape - Circle to get the info from
 * @return {JSX.Element} - fragment of ShapeInfoItems
 */
const CircleInfoItems: React.FC<{ shape: Circle }> = ({shape}) => (
    <>
        {['r'].map(propName => (
            <ShapeInfoItem
                key={uuid()}
                shape={shape}
                property={propName}
            />
        ))}
    </>
)

interface CircleProfileProps {
    circle: Circle;
    index: number;
}

/**
 * ShapeProfile subtype specific to Circle objects
 * @param {Circle} circle - Circle object this profile will be linked to
 * @param {number} index - the index of this ShapeProfile in the rendered array
 * @return {JSX.Element} - profile for the given Circle object
 */
const CircleProfile: React.FC<CircleProfileProps> = ({circle, index}) => (
    <ShapeProfileBase
        shape={circle}
        index={index}
        unitValue={circle.r}
        InfoItems={React.memo(() => <CircleInfoItems shape={circle}/>)}
    />
)


export default CircleProfile;