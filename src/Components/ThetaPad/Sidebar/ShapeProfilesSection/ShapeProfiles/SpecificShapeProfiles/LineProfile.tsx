/** LineProfile.tsx
 * @file ShapeProfileBase specific to Line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Line, LineUtils} from "../../../../../../types/shapes";
import ShapeProfileBase from "../ShapeProfileBase/ShapeProfileBase";


interface LineProfileProps {
    line: Line,
    index: number,
    fadeIn?: boolean,
}

/**
 * ShapeProfile subtype specific to Line objects
 * @param {Line} line - Line object this profile will be linked to
 * @param {number} index - index of this ShapeProfile in the rendered array
 * @param {boolean} [fadeIn] - whether or not the profile should animate in
 * @return {JSX.Element} - profile for the given Line object
 */
const LineProfile: React.FC<LineProfileProps> = ({line, index, fadeIn}) => (
    <ShapeProfileBase
        shape={line}
        index={index}
        fadeIn={fadeIn}
        unitValue={LineUtils.length_(line)}
        infoItems={['length', 'angle']}
    />
)


export default LineProfile;