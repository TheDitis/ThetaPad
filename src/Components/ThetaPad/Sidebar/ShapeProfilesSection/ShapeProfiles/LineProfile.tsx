/** LineProfile.tsx
 * @file ShapeProfile specific to Line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Line} from "../../../types/shapes";
import ShapeProfile from "./ShapeProfile";
import ShapeInfoItem from "./ShapeInfoItem";
import uuid from "react-uuid";


interface LineProfileProps {
    index: number,
    line: Line,
}

const LineInfoItems: React.FC<{shape: Line}> = (props) => (
    <>
        {['length', 'angle'].map(propName => (
            <ShapeInfoItem
                key={uuid()}
                shape={props.shape}
                property={propName}
            />
        ))}
    </>
)

const LineProfile: React.FC<LineProfileProps> = ({line, index}) => {
    return (
        <ShapeProfile
            shape={line}
            index={index}
            unitValue={line.length}
            InfoItems={React.memo(() => <LineInfoItems shape={line}/>)}
        >
        </ShapeProfile>
    )
}

export default LineProfile;