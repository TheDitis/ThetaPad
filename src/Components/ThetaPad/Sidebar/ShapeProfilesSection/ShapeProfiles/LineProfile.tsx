/** LineProfile.tsx
 * @file ShapeProfileBase specific to Line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Line} from "../../../types/shapes";
import ShapeProfileBase from "./ShapeProfileBase";
import ShapeInfoItem from "./ShapeInfoItem";
import uuid from "react-uuid";


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


interface LineProfileProps {
    line: Line,
    index: number,
}

const LineProfile: React.FC<LineProfileProps> = ({line, index}) => (
    <ShapeProfileBase
        shape={line}
        index={index}
        unitValue={line.length}
        InfoItems={React.memo(() => <LineInfoItems shape={line}/>)}
    >
    </ShapeProfileBase>
)


export default LineProfile;