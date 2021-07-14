/** LineProfile.tsx
 * @file ShapeProfile specific to Line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {Line} from "../../../types/shapes";
import ShapeProfile from "./ShapeProfile";


interface LineProfileProps {
    line: Line
}

const LineProfile: React.FC<LineProfileProps> = (props) => {
    return (
        <ShapeProfile shape={props.line}>
        </ShapeProfile>
    )
}

export default LineProfile;