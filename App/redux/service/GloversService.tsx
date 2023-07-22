import {api} from '../../utils/API';
import {
  LOGIN,
  NEWUSER,
  DASH_BOARD,
  REFRESH_TOKEN,
  DASHBOARD_MYTEAMS,
  EVENT,
  PROFILE_UPDATE,
  SELECT_TEAM,
  SELECT_TEAM_NEXT,
} from '../../utils/URL';

export const gloversService = api.injectEndpoints({
  endpoints: build => ({
    gloversLoginPost: build.mutation<any, any>({
      query: credentials => ({
        url: LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    gloversNewUserPost: build.mutation<any, any>({
      query: credentials => ({
        url: NEWUSER,
        method: 'POST',
        body: credentials,
      }),
    }),
    gloversDashBoardGet: build.query<any, any>({
      query: () => ({
        url: DASH_BOARD,
        method: 'GET',
      }),
    }),
    gloversDashBoardGetMyTeams: build.query<any, any>({
      query: () => ({
        url: DASHBOARD_MYTEAMS,
        method: 'GET',
      }),
    }),
    gloversEventGet: build.query<any, any>({
      query: () => ({
        url: EVENT,
        method: 'GET',
      }),
    }),
    gloversProfileUpdate: build.mutation<any, any>({
      query: credentials => ({
        url: PROFILE_UPDATE,
        method: 'POST',
        body: credentials,
      }),
    }),
    gloversCreateTeamGet: build.query<any, any>({
      query: () => ({
        url: SELECT_TEAM,
        method: 'GET',
      }),
    }),
    gloversCreateTeamNextGet: build.query<any, any>({
      query: () => ({
        url: SELECT_TEAM_NEXT,
        method: 'GET',
      }),
    }),

    // gloversRefreshToken: build.mutation<any, any>({
    //   query: () => ({
    //     url: REFRESH_TOKEN,
    //     method: 'POST',
    //     body: {refresh_token},
    //   }),
    // }),
  }),

  overrideExisting: true,
});

export const {
  useGloversLoginPostMutation,
  useGloversNewUserPostMutation,
  useLazyGloversDashBoardGetQuery,
  useLazyGloversDashBoardGetMyTeamsQuery,
  useLazyGloversEventGetQuery,
  useGloversProfileUpdateMutation,
  useLazyGloversCreateTeamGetQuery,
  useLazyGloversCreateTeamNextGetQuery,

  // useGloversRefreshTokenMutation,
} = gloversService;
