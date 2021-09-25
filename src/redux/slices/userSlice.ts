/** userSlice.ts
 * @file slice of Redux store containing authorized user data
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserData {
    id: string;
    name: string;
}

export interface UserStateType {
    user: UserData | null
}
const initialState: UserStateType = {
    user: null
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