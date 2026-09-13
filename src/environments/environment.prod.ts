/**
 * Swapped in for production builds via angular.json's fileReplacements.
 * earnivoApiKey stays blank here so the Earnivo visit-reward widget is fully
 * inert on the real deployment until someone explicitly configures a real
 * campaign key — even if a real key was left in environment.ts for local
 * development, a production build can never accidentally ship it.
 */
export const environment = {
  earnivoApiBaseUrl: 'https://api.earnivo.example.com/api',
  earnivoApiKey: '',
};
