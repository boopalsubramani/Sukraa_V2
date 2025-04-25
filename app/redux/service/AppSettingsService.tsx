
import { api } from '../../utils/API';
import { getConfigData } from '../../utils/ConfigStorage';

export const AppSettingService = api.injectEndpoints({
  endpoints: build => ({
    AppSetting: build.mutation<any, any>({
      async queryFn(credentials, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const config = await getConfigData();
          console.log('📦 Retrieved from getConfigData:', config.ap_se);
          const result = await fetchWithBQ({
            url: config.ap_se,
            method: 'POST',
            body: credentials,
          });

          if (result.error) {
            return { error: result.error };
          }

          return { data: result.data };
        } catch (error: any) {
          console.error("❌ AppSetting fetch error:", error);
          return { error: { status: 'FETCH_ERROR', error: error.message } };
        }
      }
    }),
  }),
  overrideExisting: true,
});

export const { useAppSettingMutation } = AppSettingService;
