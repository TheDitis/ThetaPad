/** alertSlice.ts
 * @file slice of redux store that handles triggering of snackbar warnings/info
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AlertSeverityType = 'error' | 'warning' | 'info' | 'success';

/**
 * @interface AlertStateType
 * @property {boolean} open - whether or not the alert should be showing
 * @property {AlertSeverityType} severity - determines the style of the alert
 * @property {string} message - the text to display in the alert
 */
export interface AlertStateType {
    open: boolean;
    severity: AlertSeverityType;
    message: string;
}

const initialState: AlertStateType = {
    open: false,
    severity: 'success',
    message: "",
}

export type SetAlertAction =
    PayloadAction<{severity: AlertSeverityType, message: string}>

/** slice containing the status of snackbar alerts */
const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        /** Closes the alert */
        clearAlert(state) {
            state.open = false;
        },
        /** Set both the severity & message */
        setAlert(state, action: SetAlertAction) {
            return {...action.payload, open: true}
        },
        /** Display a success alert with given message */
        success(state, action: PayloadAction<string>) {
            return {
                open: true,
                severity: 'success',
                message: action.payload
            }
        },
        /** Display a info alert with given message */
        notify(state, action: PayloadAction<string>) {
            return {
                open: true,
                severity: 'info',
                message: action.payload
            }
        },
        /** Display a warning alert with given message */
        warn(state, action: PayloadAction<string>) {
            return {
                open: true,
                severity: 'warning',
                message: action.payload
            }
        },
        /** Display an error alert with given message */
        error(state, action: PayloadAction<string>) {
            return {
                open: true,
                severity: 'error',
                message: action.payload
            }
        }
    }
})

export const {
    clearAlert,
    setAlert,
    success,
    notify,
    warn,
    error
} = alertSlice.actions;

export default alertSlice.reducer