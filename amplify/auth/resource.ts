import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['email', 'profile', 'openid'],
      },
      oidc: [
        {
          name: 'MicrosoftEntraID',
          clientId: secret('MICROSOFT_ENTRA_ID_CLIENT_ID'),
          clientSecret: secret('MICROSOFT_ENTRA_ID_CLIENT_SECRET'),
          issuerUrl:
            'https://login.microsoftonline.com/f4814d23-3835-4d87-a7dc-57a19c04684a/v2.0',
          scopes: ['email', 'profile', 'openid'],
        },
      ],
      callbackUrls: [
        'http://localhost:5173/home',
        'https://main.dfz7j288m23kc.amplifyapp.com/home',
      ],
      logoutUrls: [
        'http://localhost:5173/login',
        'https://main.dfz7j288m23kc.amplifyapp.com/login',
      ],
      scopes: ['EMAIL', 'PROFILE', 'OPENID'],
    },
  },

  multifactor: {
    mode: 'REQUIRED',
    totp: true,
  },
});
