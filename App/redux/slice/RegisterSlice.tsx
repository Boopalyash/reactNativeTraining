import {createSlice} from '@reduxjs/toolkit';
import {registerService} from '../service/RegisterService';

const initialState = {
  registerDetailsPost: [],
  registerDetailsGet: [],
  registerDetailsDelete: [],
  registerDetailsUpdate: [],
};
export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      registerService.endpoints.registerPost.matchFulfilled,
      (state, {payload}) => {
        state.registerDetailsPost = payload;
      },
    );
    builder.addMatcher(
      registerService.endpoints.registerGet.matchFulfilled,
      (state, {payload}) => {
        state.registerDetailsGet = payload;
      },
    );
    builder.addMatcher(
      registerService.endpoints.registerDelete.matchFulfilled,
      (state, {payload}) => {
        state.registerDetailsDelete = payload;
      },
    );
    builder.addMatcher(
      registerService.endpoints.registerUpdate.matchFulfilled,
      (state, {payload}) => {
        state.registerDetailsUpdate = payload;
      },
    );
  },
});

export default registerSlice.reducer;

// Explain Start

// The code in this file creates a slice called register .

// The slice has three components: name , initialState , and reducers .

// name is the name of the slice.

// It will be used to identify the slice in code and in logs.

// initialState is an object that contains information about the state of the slice at initialization.

// This object includes two properties: registerDetailsPost and registerDetailsGet .

// These are arrays of objects, each representing a different endpoint on the RegisterService API.

// reducers is an object that contains functions that will be used to reduce the state of the slice.

// Each function takes two arguments: (state, payload) .

// The first argument is the current state of the slice, and the second argument is an object containing data from one or more registered posts or get requests on the RegisterService API.

// The code will create a slice called register that will have the following properties: name - The name of the slice.

// - The name of the slice.

// initialState - The initial state of the slice.

// This will be an object with the following properties: registerDetailsPost - An array of posts that have been registered.

// registerDetailsGet - An array of GET requests that have been made to get registered details.

// registerDetailsDelete - An array of DELETE requests that have been made to delete registered posts.

// Explain End
