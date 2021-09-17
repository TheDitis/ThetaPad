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
    isTemp?: boolean,
}

/**
 * ShapeProfile subtype specific to Line objects
 * @param {Line} line - Line object this profile will be linked to
 * @param {number} index - index of this ShapeProfile in the rendered array
 * @param {boolean} [isTemp] - whether or not the profile should animate in
 * @return {JSX.Element} - profile for the given Line object
 */
const LineProfile: React.FC<LineProfileProps> = ({line, index, isTemp}) => (
    <ShapeProfileBase
        shape={line}
        index={index}
        isTemp={isTemp}
        unitValue={LineUtils.length_(line)}
        infoItems={['length', 'angle']}
    />
)


export default LineProfile;