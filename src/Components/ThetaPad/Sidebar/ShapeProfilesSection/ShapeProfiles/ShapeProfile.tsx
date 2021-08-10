export {}
///** ShapeProfile.tsx
// * @file A switch component for the ShapeProfiles of different shape types
// * @author Ryan McKay <ryanscottmckay@gmail.com>
// */
//import React from "react";
//import LineProfile from "./LineProfile";
//import {ShapeType} from "../../../types/shapes";
//import PolyLineProfile from "./PolyLineProfile";
//import CircleProfile from "./CircleProfile";
//
//
//interface ShapeProfileProps {
//    shape: ShapeType;
//    index: number;
//}
//
//const ShapeProfile: React.FC<ShapeProfileProps> = ({shape, index}) => {
//    if (shape.isLine()) {
//        return <LineProfile line={shape} index={index}/>
//    }
//    if (shape.isPoly()) {
//        return <PolyLineProfile line={shape} index={index}/>
//    }
//    if (shape.isCircle()) {
//        return <CircleProfile circle={shape} index={index}/>
//    }
//    return null;
//}
//
//export default ShapeProfile;