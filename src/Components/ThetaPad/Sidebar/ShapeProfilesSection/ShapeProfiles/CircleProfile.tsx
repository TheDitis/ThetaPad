/** CircleProfile.tsx
 * @file A profile specifically for Circle shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import ShapeProfileBase from "./ShapeProfileBase";
import ShapeInfoItem from "./ShapeInfoItem";
import uuid from "react-uuid";
import {Circle} from "../../../../../types/shapes";


const CircleInfoItems: React.FC<{ shape: Circle }> = (props) => (
    <>
        {['r'].map(propName => (
            <ShapeInfoItem
                key={uuid()}
                shape={props.shape}
                property={propName}
            />
        ))}
    </>
)


interface CircleProfileProps {
    circle: Circle;
    index: number;
}

const CircleProfile: React.FC<CircleProfileProps> = ({circle, index}) => (
    <ShapeProfileBase
        shape={circle}
        index={index}
        unitValue={circle.r}
        InfoItems={React.memo(() => <CircleInfoItems shape={circle}/>)}
    />
)


export default CircleProfile;