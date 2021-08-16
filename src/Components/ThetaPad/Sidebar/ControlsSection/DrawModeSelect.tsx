/** DrawModeSelect.tsx
 * @file The set of buttons in the sidebar for shape selection
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import SelectButton from "../ControlsSection/Controls/SelectButton";
import uuid from "react-uuid";
import {useDispatch, useSelector} from "react-redux";
import {drawModeSelector} from "../../../../redux/selectors";
import {AppDispatch} from "../../../../redux/store";
import {setDrawMode} from "../../../../redux/slices/drawModeSlice";


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
    const drawMode = useSelector(drawModeSelector)
    const dispatch = useDispatch<AppDispatch>();

    return (
        <DrawModeSelectRoot>
            {['Line', 'Poly', 'Circle'].map(label => (
                <SelectButton
                    key={uuid()}
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