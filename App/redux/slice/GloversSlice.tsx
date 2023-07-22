import {createSlice} from '@reduxjs/toolkit';
import {gloversService} from '../service/GloversService';

const initialState = {
  gloverDetails: [],
  tokenDetails: [],
  gloverDetailsPost: [],
  gloverDetailsGet: [],
  gloverDetailsGetMyTeams: [],
  gloverDetailsGetEvent: [],
  gloverDetailsPostUpdate: [],
  gloverDetailsGetCreateTeam: [],
  gloverDetailsGetCreateTeamNext: [],
  // gloverDetailRefreshTokenPost: [],
};
export const eventSlice = createSlice({
  name: 'glover',
  initialState,
  reducers: {
    // setLoginData: (state, action) => {
    //   state.gloverDetails = action.payload;
    // },
    setTokenDetails: (state, action) => {
      state.tokenDetails = action.payload.data;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      gloversService.endpoints.gloversLoginPost.matchFulfilled,
      (state, {payload}) => {
        if (payload.code === 2) {
          console.log('APIFailed----------------------->', payload);
        } else {
          state.gloverDetails = payload.data;
          state.tokenDetails = payload.data.token_details;
          console.log(
            'DashBoard_Details----------------------->',
            payload.data,
          );
        }
      },
    );
    builder.addMatcher(
      gloversService.endpoints.gloversNewUserPost.matchFulfilled,
      (state, {payload}) => {
        state.gloverDetailsPost = payload;
      },
    );
    builder.addMatcher(
      gloversService.endpoints.gloversDashBoardGet.matchFulfilled,
      (state, {payload}) => {
        state.gloverDetailsGet = payload;
        console.log('DashBoardGetPayload=====================>', payload);
      },
    );
    builder.addMatcher(
      gloversService.endpoints.gloversDashBoardGetMyTeams.matchFulfilled,
      (state, {payload}) => {
        state.gloverDetailsGetMyTeams = payload;
        console.log('DashBoardGetMyTeams+++++++++++++++++++++++', payload);
      },
    );
    builder.addMatcher(
      gloversService.endpoints.gloversEventGet.matchFulfilled,
      (state, {payload}) => {
        state.gloverDetailsGetEvent = payload;
        console.log('EventGet&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', payload);
      },
    );
    builder.addMatcher(
      gloversService.endpoints.gloversProfileUpdate.matchFulfilled,
      (state, {payload}) => {
        state.gloverDetailsPostUpdate = payload;
        console.log('Profile updated@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', payload);
      },
    );
    builder.addMatcher(
      gloversService.endpoints.gloversCreateTeamGet.matchFulfilled,
      (state, {payload}) => {
        state.gloverDetailsGetCreateTeam = payload;
        console.log('Create Team((((((((((((((((((((((((', payload);
      },
    );
    builder.addMatcher(
      gloversService.endpoints.gloversCreateTeamNextGet.matchFulfilled,
      (state, {payload}) => {
        state.gloverDetailsGetCreateTeamNext = payload;
        console.log('Create Teaam Next)))))))))))))', payload);
      },
    );
    // builder.addMatcher(
    //   gloversService.endpoints.gloversRefreshToken.matchFulfilled,
    //   (state, {payload}) => {
    //     state.gloverDetailRefreshTokenPost = payload;
    //   },
    // );
  },
});

export const {setTokenDetails} = eventSlice.actions;

export default eventSlice.reducer;
