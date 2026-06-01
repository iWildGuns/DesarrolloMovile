import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
            authority: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_wlvzyTecs',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'please-enter-clientId',
            scope: 'please-enter-scopes', // 'openid profile ' + your scopes
            responseType: 'code',
            silentRenew: true,
            silentRenewUrl: window.location.origin + '/silent-renew.html',
            renewTimeBeforeTokenExpiresInSeconds: 10,
        }
}
