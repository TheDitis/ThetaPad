/** PolyLineProfile.tsx
 * @file A Profile specific to they Poly line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import ShapeProfileBase from "../../ShapeProfileBase";
import ShapeInfoItem from "../../ShapeInfoItem";
import uuid from "react-uuid";
import {Poly} from "../../../../../../../types/shapes";
import React from "react";
import PolyProfileDetailsSection from "./PolyProfileDetailsSection";


/**
 * Renders information items relevant to Poly objects. Used only in
 * PolyLineProfile below, passed as prop to ShapeProfileBase
 * @param {Poly} shape - Poly object to get the info from
 * @return {JSX.Element} - fragment of ShapeInfoItems
 */
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

/**
 * ShapeProfile subtype specific to Poly objects
 * @param {Poly} line - Poly line object this profile will be linked to
 * @param {number} index - index of this ShapeProfile in the rendered array
 * @return {JSX.Element} - profile for the given Poly object
 */
const PolyLineProfile: React.FC<PolyLineProfileProps> = ({line, index}) => (
    <ShapeProfileBase
        shape={line}
        index={index}
        unitValue={line.totalLength}
        InfoItems={React.memo(() => <PolyLineInfoItems shape={line}/>)}
        DetailsSection={React.memo(() => <PolyProfileDetailsSection line={line}/>)}
    >
    </ShapeProfileBase>
)


export default PolyLineProfile;