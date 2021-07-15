/** PolyLineProfile.tsx
 * @file A Profile specific to they Poly line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Poly} from "../../../types/shapes";
import ShapeProfileBase from "./ShapeProfileBase";
import ShapeInfoItem from "./ShapeInfoItem";
import uuid from "react-uuid";


const PolyLineInfoItems: React.FC<{shape: Poly}> = ({shape}) => (
    <>
        {['totalLength', 'averageAngle'].map(propName => (
            <ShapeInfoItem key={uuid()} shape={shape} property={propName}/>
        ))}
    </>
)


interface PolyLineProfileProps {
    line: Poly,
    index: number,
}

const PolyLineProfile: React.FC<PolyLineProfileProps> = ({line, index}) => {
    return (
        <ShapeProfileBase
            shape={line}
            index={index}
            unitValue={line.totalLength}
            InfoItems={React.memo(() => <PolyLineInfoItems shape={line}/>)}
        >
        </ShapeProfileBase>
    )
}

export default PolyLineProfile;