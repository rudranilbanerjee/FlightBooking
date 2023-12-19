import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    flightList:[],
}
const searchFlightListSlice = createSlice({
    name: "searchflightlist",
    initialState,
    reducers: {
        handleChangeFlightList(state, {payload}) {
            console.log(payload)
            state = {
                ...state,
                ...payload,
            }
            console.log(state);
            return state;
        },
        flightListDataReset(state, action) {
            // Reset the state to the initial state
            return initialState;
        },
    }
})
export default searchFlightListSlice.reducer;
export const { handleChangeFlightList, flightListDataReset } = searchFlightListSlice.actions;