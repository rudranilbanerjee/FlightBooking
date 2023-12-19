import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    flyingForm: null,
    flyingTo: null,
    deparatureDate: '',
    traveller: {
        adults: 0,
        childrens: 0,
        infants: 0
    },
    classType: '',
}
const searchFlightAirportSlice = createSlice({
    name: "searchflightairport",
    initialState,
    reducers: {
        handleChangeFieldForSearchFlight(state, {payload}) {
            console.log(payload)
            state = {
                ...state,
                ...payload,
            }
            console.log(state);
            return state;
        },
        handleTraveller(state, { payload }) {
            switch (payload.type) {
                case 'increase':
                    return {
                        ...state,
                        traveller: {
                            ...state.traveller,
                            [payload.key]: state.traveller[payload.key] + 1,
                        },
                    };
                case 'decrease':
                    return {
                        ...state,
                        traveller: {
                            ...state.traveller,
                            [payload.key]: state.traveller[payload.key]>0?state.traveller[payload.key] - 1:0,
                        },
                    };
                default:
                    // Code to be executed if none of the cases match the expression
                    return state;
            }

        },
        searchFlightDataReset(state, action) {
            // Reset the state to the initial state
            return initialState;
        },
    }
})
export default searchFlightAirportSlice.reducer;
export const { handleChangeFieldForSearchFlight, searchFlightDataReset, handleTraveller } = searchFlightAirportSlice.actions;