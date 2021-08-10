export {}
///** CircleProfile.tsx
// * @file A profile specifically for CircleType shapes
// * @author Ryan McKay <ryanscottmckay@gmail.com>
// */
//import React from "react";
//import {CircleType} from "../../../types/shapes";
//import ShapeProfileBase from "./ShapeProfileBase";
//import ShapeInfoItem from "./ShapeInfoItem";
//import uuid from "react-uuid";
//
//
//const CircleInfoItems: React.FC<{shape: CircleType}> = (props) => (
//    <>
//        {['radius'].map(propName => (
//            <ShapeInfoItem
//                key={uuid()}
//                shape={props.shape}
//                property={propName}
//            />
//        ))}
//    </>
//)
//
//
//interface CircleProfileProps {
//    circle: CircleType;
//    index: number;
//}
//
//const CircleProfile: React.FC<CircleProfileProps> = ({circle, index}) => (
//    <ShapeProfileBase
//        shape={circle}
//        index={index}
//        unitValue={circle.r}
//        InfoItems={React.memo(() => <CircleInfoItems shape={circle}/>)}
//    />
//)
//
//
//export default CircleProfile;