/** SnackBar.tsx
 * @file Listens for alerts and displays snackbar notifiers accordingly
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Snackbar} from "@material-ui/core";


interface SnackBarProps {
}

const SnackBar: React.FC<SnackBarProps> = () => {
    return (
        <Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}

        />
    )
}


export default SnackBar;