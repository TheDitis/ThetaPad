/** PolyLineProfile.tsx
 * @file A Profile specific to they Poly line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import ShapeProfileBase from "./ShapeProfileBase";
import ShapeInfoItem from "./ShapeInfoItem";
import uuid from "react-uuid";
import {Poly} from "../../../../../types/shapes";
import React from "react";


const PolyLineInfoItems: React.FC<{ shape: Poly }> = ({shape}) => (
    <>
        {['totalLength'].map(propName => (
            <ShapeInfoItem key={uuid()} shape={shape} property={propName}/>
        ))}
    </>
)


interface PolyLineProfileProps {
    line: Poly;
    index: number;
}

const PolyLineProfile: React.FC<PolyLineProfileProps> = ({line, index}) => (
    <ShapeProfileBase
        shape={line}
        index={index}
        unitValue={line.totalLength}
        InfoItems={React.memo(() => <PolyLineInfoItems shape={line}/>)}
    >
    </ShapeProfileBase>
)


export default PolyLineProfile;