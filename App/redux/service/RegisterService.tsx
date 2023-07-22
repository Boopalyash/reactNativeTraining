import {api} from '../../utils/API';
import {REGISTERPOST} from '../../utils/URL';

export const registerService = api.injectEndpoints({
  endpoints: build => ({
    registerPost: build.mutation<any, any>({
      query: credentials => ({
        url: REGISTERPOST,
        method: 'POST',
        body: credentials,
      }),
    }),
    registerGet: build.mutation<any, any>({
      query: params => ({
        url: `v2/users/${params}`,
        method: 'GET',
      }),
    }),
    registerDelete: build.mutation<any, any>({
      query: params => ({
        url: `v2/users/${params}`,
        method: 'DELETE',
      }),
    }),
    registerUpdate: build.mutation<any, {id: number; payload: any}>({
      query: ({id, body}: any) => ({
        url: `v2/users/${id}`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterPostMutation,
  useRegisterGetMutation,
  useRegisterDeleteMutation,
  useRegisterUpdateMutation,
} = registerService;

// Explain start

// The code in this section registers a new mutation with the registerService.

// The mutation will have the following fields: - query - This field contains the credentials that were used to create the registration request.

// - url - This field specifies the URL where the registration request should be sent.

// - method - This field specifies the HTTP method (POST, GET, or DELETE) that should be used when sending the registration request.

// - body - This field contains data that will be sent with the registration request.

// The code will allow you to inject custom mutations into the registerService object.

// These mutations will be used to perform various actions on registered posts, users, and deletes.

// The useRegisterPostMutation , useRegisterGetMutation , and useRegisterDeleteMutation functions will allow you to specify how the corresponding mutation should be performed.

// The useRegisterPostMutation function will allow you to specify how the registerPost mutation should be used.

// The useRegisterGetMutation function will allow you to specify how the registerGet mutation should be used.

// The useRegisterDeleteMutation function will allow you to specify how the registerDelete mutation should be used.

// Explain end
