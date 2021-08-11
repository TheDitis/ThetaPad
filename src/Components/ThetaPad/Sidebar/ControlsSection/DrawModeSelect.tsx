/** DrawModeSelect.tsx
 * @file The set of buttons in the sidebar for shape selection
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
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
}


const DrawModeSelect: React.FC<DrawModeSelectProps> = () => (

    <DrawModeSelectRoot>
        {['Line', 'Poly', 'Circle'].map(label => (
            <SelectButton
                key={uuid()}
                width={50}
                onClick={() => null}
                selected={true}
            >
                {label}
            </SelectButton>
        ))}
    </DrawModeSelectRoot>
)


export default DrawModeSelect;