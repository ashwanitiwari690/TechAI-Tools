/**
 * Swapped in for production builds via angular.json's fileReplacements.
 * earnivoApiKey stays blank here so the Earnivo visit-reward widget is fully
 * inert on the real deployment until someone explicitly configures a real
 * campaign key — even if a real key was left in environment.ts for local
 * development, a production build can never accidentally ship it.
 */
export const environment = {
  earnivoApiBaseUrl: 'https://api.admobility.in/api',
  earnivoApiKey: 'ak_c2a5aa86a14a7972060644d7739a1c3fc22a3109782a19d4',
};
