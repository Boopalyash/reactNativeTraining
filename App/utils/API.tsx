// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from '@reduxjs/toolkit/query';
// import {BASE_URL} from '../utils/URL';
// import {RootState} from '../redux/Store';

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers, {getState}) => {
//     headers.set('Content-Type', 'application/json');
//     headers.set('cache-control', 'no-cache');
//     const token = (getState() as RootState).glover.tokenDetails;
//     console.log('************************************', token?.access_token);

//     if (token?.access_token) {
//       headers.set('Authorization', `Bearer ${token?.access_token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithInterceptor: BaseQueryFn<
//   FetchArgs,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   //   const isNetworkavailable = store.getState().device.isNetworkAvailable;
//   //   if (!isNetworkavailable) {
//   //     return NetworkError;
//   //   }
//   let result = await baseQuery(args, api, extraOptions);
//   console.log('Result with Network request', result);
//   //   if (result.error && result.error.status === 401) {
//   //     // try to get a new token
//   //     const refresh_token = store.getState().auth.loginData?.refresh_token;
//   //     const refreshResult: any = await baseQuery(
//   //       {
//   //         url: REFRESH_TOKEN,
//   //         method: 'POST',
//   //         body: {refresh_token},
//   //       },
//   //       api,
//   //       extraOptions,
//   //     );
//   //     if (refreshResult.data && refreshResult?.data?.code === 0) {
//   //       // store the new token
//   //     //   store.dispatch(setLoginData(refreshResult.data));
//   //       // retry the initial query
//   //       result = await baseQuery(args, api, extraOptions);
//   //     } else {
//   //       // api.dispatch(loggedOut())
//   //     }
//   //   } else if (result.error && result.error.status === 400) {
//   //     // Utility.showSnackBar(result.error.data.message);
//   //   }
//   return result;
// };

// export const api = createApi({
//   baseQuery: baseQueryWithInterceptor,
//   endpoints: () => ({}),
// });

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import {BASE_URL, REFRESH_TOKEN} from '../utils/URL';
import {RootState, store} from '../redux/Store';
import {gloversService} from '../redux/service/GloversService';
import {setTokenDetails} from '../redux/slice/GloversSlice';

// utilities
// import {BASE_URL, REFRESH_TOKEN} from './URL';
// import {RootState, store} from '../redux/store';
// import Utility from "./Utility";
// import {CustomError} from '../entities/ErrorObject';
// import {logout, setLoginData} from '../redux/slices/AuthSlice';

const NetworkError = {
  error: {
    status: 408,
    statusText: 'Bad Request',
    data: {
      code: 408,
      status: 'Network Error',
      message: 'Please check your internet connectivity',
    },
  },
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    headers.set('Content-Type', 'application/json');
    headers.set('cache-control', 'no-cache');
    const token = (getState() as RootState).glover.tokenDetails;

    // if token is available, include the token to the headers
    console.log('ACCESS_TOKEN&&&&&&&&&&&&&>>>>>>>>>>>>>>>>>>>>', token?.access_token);
    if (token?.access_token) {
      headers.set('Authorization', `${token?.access_token}`);
    }
    return headers;
  },
});

// API Logic
const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // check if network connection is available or not
  // const isNetworkavailable = store.getState().device.isNetworkAvailable;
  // if (!isNetworkavailable) {
  //   Utility.showSnackBar('Please check your internet connectivity');
  //   return NetworkError;
  // }
  let result = await baseQuery(args, api, extraOptions);
  // console.log("API <----> Result", result);

  if (result.error && result.error.status === 401) {
    // try to get a new token for unauthorised access
    const refresh_token = store.getState().glover.tokenDetails?.refresh_token;
    const refreshResult: any = await baseQuery(
      {
        url: REFRESH_TOKEN,
        method: 'POST',
        body: {refresh_token},
      },
      api,
      extraOptions,
    );
    console.log('refreshResult', refreshResult);
    if (refreshResult.data && refreshResult?.data?.code === 0) {
      // store the new token
      store.dispatch(setTokenDetails(refreshResult.data));
      // store.dispatch(gloversService(refreshResult.data));

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else if (refreshResult.data && refreshResult?.data?.code === 2) {
      console.log('Refresh-Token-Invalid');
      // navigation.navigate('Signin');
      // store.dispatch(logout());
    }
  } else if (result.error && result.error.status === 401) {
    // Utility.showSnackBar(result.error.data?.message);
    // store.dispatch(logout());
  } else if (result.error && result.error.status === 400) {
    // Utility.showSnackBar(result.error.data?.message);
  } else if (result.error && result.error.status === 404) {
    // Utility.showSnackBar(result.error.data?.message);
  } else if (result.error && result.error.status === 500) {
    // Utility.showSnackBar(result.error.data?.message);
  } else if (result.error && result.error.status === 'FETCH_ERROR') {
    return NetworkError;
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
