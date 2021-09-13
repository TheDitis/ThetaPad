/** Overlays.tsx
 * @file Container for overlay components
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import EndPolyDrawButton from "./EndPolyDrawButton";


/**
 * Container for app overlays for organization
 * @return {JSX.Element} - fragment of overlay components
 */
const Overlays: React.FC = () => {
    return (
        <>
            <EndPolyDrawButton/>
        </>
    )
}


export default Overlays;