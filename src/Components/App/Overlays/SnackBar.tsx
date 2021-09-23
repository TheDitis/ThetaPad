/** SnackBar.tsx
 * @file Listens for alerts and displays snackbar notifiers accordingly
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Snackbar} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {alertSelector} from "../../../redux/selectors";
import {clearAlert} from "../../../redux/slices/alertSlice";
import Alert from '@material-ui/lab/Alert'


interface SnackBarProps {
}

/**
 * Listens to alertSlice in redux and displays Snackbar alerts accordingly
 * @return {JSX.Element} - MUI Snackbar & nested Alert with info from alertSlice
 */
const SnackBar: React.FC<SnackBarProps> = () => {
    const {open, severity, message} = useAppSelector(alertSelector);
    const dispatch = useAppDispatch();

    const close = () => dispatch(clearAlert())

    return (
        <Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            open={open}
            autoHideDuration={3000}
            onClose={close}
        >
            <Alert
                elevation={8}
                variant={'filled'}
                onClose={close}
                severity={severity}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}


export default SnackBar;