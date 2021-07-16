/** ControlsSection.tsx
 * @file The component at the top of the Sidebar that holds primary controls
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {PrimaryDispatch} from "../../ThetaPad";
import {ShapeKind} from "../../types/shapes";
import DrawModeSelect from "./DrawModeSelect";
import {ChangeDrawModeAction} from "../../types/actions";

// Component style properties
const styles: {[property: string]: string} = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "2px solid rgba(255, 255, 255, 0.4)",
}

interface ControlsProps {
    drawMode: ShapeKind,
    dispatch: PrimaryDispatch,
}

/**
 * This component sits at the top of the Sidebar and holds the primary controls
 * @param {ShapeKind} drawMode - the current shape-draw setting
 * @param {(action: Action) => void} dispatch - primary app dispatch function
 */
const ControlsSection: React.FC<ControlsProps> = ({drawMode, dispatch}) => {
    return (
        <div style={styles}>
            <DrawModeSelect
                drawMode={drawMode}
                onChange={(label) => {
                    dispatch(new ChangeDrawModeAction(label))
                }}
            />
        </div>
    )
}

export default React.memo(
    ControlsSection,
    (prev, next) => {
        return prev.drawMode === next.drawMode;
    }
)