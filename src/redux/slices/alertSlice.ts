/** alertSlice.ts
 * @file slice of redux store that handles triggering of snackbar warnings/info
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AlertSeverityType = 'error' | 'warning' | 'info' | 'success';

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

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        clearAlert(state) {
            state.open = false;
        },
        setAlert(state, action: SetAlertAction) {
            return {...action.payload, open: true}
        },
        success(state, action: PayloadAction<string>) {
            return {
                open: true,
                severity: 'success',
                message: action.payload
            }
        },
        info(state, action: PayloadAction<string>) {
            return {
                open: true,
                severity: 'info',
                message: action.payload
            }
        },
        warn(state, action: PayloadAction<string>) {
            return {
                open: true,
                severity: 'warning',
                message: action.payload
            }
        },
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
    info,
    warn,
    error
} = alertSlice.actions;

export default alertSlice.reducer