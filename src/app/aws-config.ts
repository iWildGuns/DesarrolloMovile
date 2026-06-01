import { ResourcesConfig } from 'aws-amplify';

export const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_erWiAxrWc',
      userPoolClientId: '1r98hstr8j5k5r3p880n9kbel1',
      loginWith: {
        email: true,
        oauth: {
          domain: 'us-east-2erwiaxrwc.auth.us-east-2.amazoncognito.com',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: ['http://localhost:8100/login'],
          redirectSignOut: ['http://localhost:8100/login'],
          responseType: 'code' as 'code',
        },
      },
    },
  },
};
