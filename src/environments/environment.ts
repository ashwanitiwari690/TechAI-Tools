/**
 * Earnivo reward verification — the campaign credential from the Earnivo
 * agent panel (Campaign > Website Verification > API Key). Visitors sent
 * here by an Earnivo Website Promotion campaign arrive with a one-time
 * token in the URL; the reward widget pairs that token with this key to
 * confirm the visit and credit the visitor's wallet.
 *
 * This is the default (development) environment, swapped out for
 * environment.prod.ts in production builds via angular.json's
 * fileReplacements — production ships with earnivoApiKey blank so the
 * widget stays fully inert until someone configures a real campaign key.
 */
export const environment = {
  earnivoApiBaseUrl: 'http://localhost:4227/api',
  earnivoApiKey: 'ak_850959ab630ba15d82651d6e86c5012df319b07cb86150cc',
};
