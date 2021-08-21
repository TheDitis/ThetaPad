/** LineProfile.tsx
 * @file ShapeProfileBase specific to Line type
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Line, LineUtils} from "../../../../../../types/shapes";
import ShapeProfileBase from "../ShapeProfileBase";
import ShapeInfoItem from "../ShapeInfoItem";
import uuid from "react-uuid";

/**
 * Renders information items relevant to Line objects. Used only in LineProfile
 * below, passed as a prop to ShapeProfileBase
 * @param {Line} shape - Line object to get the info from
 * @return {JSX.Element} - fragment of ShapeInfoItems
 */
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

/**
 * ShapeProfile subtype specific to Line objects
 * @param {Line} line - Line object this profile will be linked to
 * @param {number} index - index of this ShapeProfile in the rendered array
 * @return {JSX.Element} - profile for the given Line object
 */
const LineProfile: React.FC<LineProfileProps> = ({line, index}) => (
    <ShapeProfileBase
        shape={line}
        index={index}
        unitValue={LineUtils.length_(line)}
        InfoItems={React.memo(() => <LineInfoItems shape={line}/>)}
    />
)


export default LineProfile;