/** PolyLineProfile.tsx
 * @file A Profile specific to they Poly line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import ShapeProfileBase from "../../ShapeProfileBase/ShapeProfileBase";
import {Poly} from "../../../../../../../types/shapes";
import React from "react";
import PolyProfileDetailsSection from "./PolyProfileDetailsSection";


interface PolyLineProfileProps {
    line: Poly;
    index: number;
    isTemp?: boolean;
}

/**
 * ShapeProfile subtype specific to Poly objects
 * @param {Poly} line - Poly line object this profile will be linked to
 * @param {number} index - index of this ShapeProfile in the rendered array
 * @param {boolean} [isTemp] - whether or not the profile should animate in
 * @return {JSX.Element} - profile for the given Poly object
 */
const PolyLineProfile: React.FC<PolyLineProfileProps> = ({line, index, isTemp}) => (
    <ShapeProfileBase
        shape={line}
        index={index}
        isTemp={isTemp}
        unitValue={line.totalLength}
        infoItems={['totalLength']}
    >
        <PolyProfileDetailsSection line={line}/>
    </ShapeProfileBase>
)


export default PolyLineProfile;