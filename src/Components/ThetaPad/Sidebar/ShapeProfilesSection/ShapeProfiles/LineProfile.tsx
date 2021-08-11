/** LineProfile.tsx
 * @file ShapeProfileBase specific to Line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Line, LineUtils} from "../../../../../types/shapes";
import ShapeProfileBase from "./ShapeProfileBase";
import ShapeInfoItem from "./ShapeInfoItem";
import uuid from "react-uuid";


const LineInfoItems: React.FC<{ shape: Line }> = ({shape}) => {
    const properties = {
        'length': shape.length,
        'angle': shape.angle,
    }

    return (
        <>
            {Object.entries(properties).map(([propName, value]) => (

                <ShapeInfoItem
                    key={uuid()}
                    shape={shape}
                    value={value}
                    property={propName}
                />
            ))}
        </>
    )
}


interface LineProfileProps {
    line: Line,
    index: number,
}

const LineProfile: React.FC<LineProfileProps> = ({line, index}) => (
    <ShapeProfileBase
        shape={line}
        index={index}
        unitValue={LineUtils.length_(line)}
        InfoItems={React.memo(() => <LineInfoItems shape={line}/>)}
    >
    </ShapeProfileBase>
)


export default LineProfile;