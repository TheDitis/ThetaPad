/** userSlice.ts
 * @file slice of Redux store containing authorized user data
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../store";
import _ from "lodash";
import {getAuth, signOut} from "firebase/auth";

export interface UserData {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

export type UserType = UserData | null;

export interface UserStateType {
    user: UserType
}
const initialState: UserStateType = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserData>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        }
    }
})


export const {
    setUser,
    clearUser
} = userSlice.actions;


export default userSlice.reducer;



export const logIn = (user: UserType) => (
    (dispatch: AppDispatch, getState: () => RootState) => {
        if (user !== null) {
            dispatch(setUser(_.pick(
                user,
                ["uid", "displayName", "email", "photoURL"]
            )))
        }
        console.log("user: ", user)
    }
)

export const logOut = () =>(
    (dispatch: AppDispatch, getState: () => RootState) => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch(clearUser());
            })
            .catch(err => {
                console.error(err)
            })
    }
)