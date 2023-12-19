import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartValueCount:0,
    cartData:[],
    cartAmmount:0,
}
const cartHandler = createSlice({
    name: "carthandler",
    initialState,
    reducers: {
        handleCart(state, {payload}) {
            console.log(payload)
            state = {
                ...state,
                ...payload,
            }
            console.log(state);
            return state;
        },
        cartDataReset(state, action) {
            // Reset the state to the initial state
            return initialState;
        },
    }
})
export default cartHandler.reducer;
export const { handleCart, cartDataReset } = cartHandler.actions;