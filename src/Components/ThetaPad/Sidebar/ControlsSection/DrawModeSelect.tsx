/** DrawModeSelect.tsx
 * @file The set of buttons in the sidebar for shape selection
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import SelectButton from "../ControlsSection/Controls/SelectButton";
import {drawModeSelector} from "../../../../redux/selectors";
import {setDrawMode} from "../../../../redux/slices/drawModeSlice";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";


interface DrawModeSelectStyleProps {
}

const DrawModeSelectRoot = styled.div<DrawModeSelectStyleProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`


/**
 * Horizontal array of SelectButtons linked to draw-mode (which shape type to
 * draw on next click
 * @return {JSX.Element} - flex-row div with a select button for each draw-mode
 */
const DrawModeSelect: React.FC = () => {
    const drawMode = useAppSelector(drawModeSelector)
    const dispatch = useAppDispatch();

    return (
        <DrawModeSelectRoot>
            {['Line', 'Poly', 'Circle'].map(label => (
                <SelectButton
                    key={label + "Select"}
                    width={50}
                    onClick={() => dispatch(setDrawMode(label))}
                    selected={label === drawMode}
                >
                    {label}
                </SelectButton>
            ))}
        </DrawModeSelectRoot>
    )
}

export default DrawModeSelect;