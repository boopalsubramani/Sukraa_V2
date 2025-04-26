
import { api } from '../../utils/API';
import { getConfigData } from '../../utils/ConfigStorage';

export const NotificationUpdateService = api.injectEndpoints({
  endpoints: build => ({
    NotificationUpdate: build.mutation<any, any>({
      async queryFn(credentials, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const config = await getConfigData();
          const result = await fetchWithBQ({
            url: config.us_nu,
            method: 'POST',
            body: credentials,
          });

          if (result.error) {
            return { error: result.error };
          }

          return { data: result.data };
        } catch (error: any) {
          return { error: { status: 'FETCH_ERROR', error: error.message } };
        }
      }
    }),
  }),
  overrideExisting: true,
});

export const { useNotificationUpdateMutation } = NotificationUpdateService;
