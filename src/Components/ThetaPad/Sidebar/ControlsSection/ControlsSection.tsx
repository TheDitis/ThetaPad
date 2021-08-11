/** ControlsSection.tsx
 * @file The component at the top of the Sidebar that holds primary controls
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import DrawModeSelect from "./DrawModeSelect";

// Component style properties
const styles: {[property: string]: string} = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "2px solid rgba(255, 255, 255, 0.4)",
}

interface ControlsProps {}

const ControlsSection: React.FC<ControlsProps> = () => {
    return (
        <div style={styles}>
            <DrawModeSelect/>
        </div>
    )
}

export default ControlsSection;

//export default React.memo(
//    ControlsSection,
//    (prev, next) => {
//        return (
//            prev.drawMode === next.drawMode
//        ) || (
//            (prev.tempShape === null && next.tempShape !== null)
//            || (prev.tempShape !== null && next.tempShape === null)
//        )
//    }
//)