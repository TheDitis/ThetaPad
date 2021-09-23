/** ControlsSection.tsx
 * @file The component at the top of the Sidebar that holds primary controls
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import DrawModeSelect from "./DrawModeSelect";
import ImageUploadControl from "./Controls/ImageUploadControl";
import UndoOrRedoButton from "./Controls/UndoOrRedoButton";
import styled from "styled-components";

const ControlsSectionRoot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
  
  .topRow {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`


/**
 * Holds main controls for the app, including draw-mode select and image upload
 * @return {JSX.Element} - flex-column div containing control components\
 */
const ControlsSection: React.FC = () => {
    return (
        <ControlsSectionRoot>
            <div className={"topRow"}>
                <UndoOrRedoButton variant={"undo"}/>
                <ImageUploadControl/>
                <UndoOrRedoButton variant={"redo"}/>
            </div>
            <DrawModeSelect/>
        </ControlsSectionRoot>
    )
}

export default ControlsSection;

