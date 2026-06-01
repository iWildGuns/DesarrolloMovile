import { ResourcesConfig } from 'aws-amplify';

export const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_13E4aOdM3c',
      userPoolClientId: '6ov7lbjp57pblqam1m5fle9e53',
      loginWith: {
        email: true,
        oauth: {
          domain: 'us-east-2erwiaxrwc.auth.us-east-2.amazoncognito.com',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: ['http://localhost:8100/sign-in'],
          redirectSignOut: ['http://localhost:8100/sign-in'],
          responseType: 'code' as 'code',
        },
      },
    },
  },
};
