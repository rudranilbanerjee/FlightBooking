import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FlightBookApi,{encryptRequestBody} from "../../../BaseApi";
const initialState = {
  isLoading: false,
  response: {},
  isSuccess: false,
  error: null,
};

// Create an async thunk action
export const searchFlightApiSlice = createAsyncThunk(
  "searchflight",
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

const SearchFlightSlice = createSlice({
  name: "search flight",
  initialState,
  reducers: {
    searchFlightApiDataReset(state, action) {
      return initialState;
    },
  }, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(searchFlightApiSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
        state.isSuccess = false;
      })
      .addCase(searchFlightApiSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = action.payload; // Update the authToken with the API response
      })
      .addCase(searchFlightApiSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set the error state with the error message
        state.isSuccess = false;
      });
  },
});

export default SearchFlightSlice.reducer;
export const { searchFlightApiDataReset } = SearchFlightSlice.actions;
