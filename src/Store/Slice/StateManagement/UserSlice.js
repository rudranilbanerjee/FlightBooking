import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    signInEmail:'',
    firstName:'',
    lastName:'',
    gender:'',
    profileImage:''
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleChangeField(state, {payload}) {
            state = {
                ...state,
                ...payload
            }
            console.log(state);
            return state;
        },
        userDataResetState(state, action) {
            // Reset the state to the initial state
            return initialState;
        },
    }
})
export default userSlice.reducer;
export const { handleChangeField,userDataResetState } = userSlice.actions;