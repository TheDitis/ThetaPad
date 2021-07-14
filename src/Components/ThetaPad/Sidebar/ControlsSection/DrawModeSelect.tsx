/** DrawModeSelect.tsx
 * @file The set of buttons in the sidebar for shape selection
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import {ShapeKind} from "../../types/shapes";
import SelectButton from "../ControlsSection/Controls/SelectButton";
import uuid from "react-uuid";



interface DrawModeSelectStyleProps {
}

const DrawModeSelectRoot = styled.div<DrawModeSelectStyleProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface DrawModeSelectProps {
    drawMode: ShapeKind,
    onChange: (ShapeKind) => void,
}

/**
 * A set of buttons for selecting the drawing mode
 * @param {ShapeKind} drawMode - the current drawing mode
 * @param {(ShapeKind) => void} onChange - function to call on click
 * @return {JSX.Element}
 * @constructor
 */
const DrawModeSelect: React.FC<DrawModeSelectProps> = (
    {drawMode, onChange}
) => (
    <DrawModeSelectRoot>
        {['Line', 'Poly', 'Circle'].map(label => (
            <SelectButton
                key={uuid()}
                width={60}
                onClick={() => onChange(label)}
                selected={label === drawMode}
            >
                {label}
            </SelectButton>
        ))}
    </DrawModeSelectRoot>
)


export default DrawModeSelect;