import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FlightBookApi,{encryptRequestBody} from "../../../BaseApi";
const initialState = {
  isLoading: false,
  response: {},
  isSuccess: false,
  error: null,
};

// Create an async thunk action
export const searchFlightAirportApiSlice = createAsyncThunk(
  "searchflightairport",
  async (values, { rejectWithValue }) => {
    try {
      const response = await FlightBookApi({
        method: values.method,
        url: values.url,
        data: JSON.stringify({
          request_data: encryptRequestBody(values.data),
        }),
      });
      return response.data[`main_data`];

    } catch (err) {
      // Use rejectWithValue to handle errors and set the error state
      return rejectWithValue(err);
    }
  }
);

const SearchFlightAirportSlice = createSlice({
  name: "search flight airport",
  initialState,
  reducers: {
    searchFlightAirportApiDataReset(state, action) {
      return initialState;
    },
  }, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(searchFlightAirportApiSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
        state.isSuccess = false;
      })
      .addCase(searchFlightAirportApiSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = action.payload; // Update the authToken with the API response
      })
      .addCase(searchFlightAirportApiSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set the error state with the error message
        state.isSuccess = false;
      });
  },
});

export default SearchFlightAirportSlice.reducer;
export const { searchFlightAirportApiDataReset } = SearchFlightAirportSlice.actions;
