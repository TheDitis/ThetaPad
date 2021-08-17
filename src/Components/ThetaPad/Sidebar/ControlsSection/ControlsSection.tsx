/** ControlsSection.tsx
 * @file The component at the top of the Sidebar that holds primary controls
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import DrawModeSelect from "./DrawModeSelect";
import ImageUploadControl from "./Controls/ImageUploadControl";

// Component style properties
const styles: { [property: string]: string } = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "2px solid rgba(255, 255, 255, 0.4)",
}

/**
 * Holds main controls for the app, including draw-mode select and image upload
 * @return {JSX.Element} - flex-column div containing control components\
 */
const ControlsSection: React.FC = () => {
    return (
        <div style={styles}>
            <ImageUploadControl/>
            <DrawModeSelect/>
        </div>
    )
}

export default ControlsSection;

