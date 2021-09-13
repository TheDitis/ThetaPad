/** Overlays.tsx
 * @file Container for overlay components
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import EndPolyDrawButton from "./EndPolyDrawButton";
import SnackBar from "./SnackBar";


/**
 * Container for app overlays for organization
 * @return {JSX.Element} - fragment of overlay components
 */
const Overlays: React.FC = () => {
    return (
        <>
            <EndPolyDrawButton/>
            <SnackBar/>
        </>
    )
}


export default Overlays;