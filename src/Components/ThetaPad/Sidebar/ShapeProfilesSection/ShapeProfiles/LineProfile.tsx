/** LineProfile.tsx
 * @file ShapeProfile specific to Line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Line} from "../../../types/shapes";
import ShapeProfile from "./ShapeProfile";


interface LineProfileProps {
    index: number,
    line: Line,
}

const LineProfile: React.FC<LineProfileProps> = ({line, index}) => {
    return (
        <ShapeProfile
            shape={line}
            index={index}
            infoProps={['length', 'angle']}
            unitValue={line.length}
        >
        </ShapeProfile>
    )
}

export default LineProfile;