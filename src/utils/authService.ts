import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { signInWithRedirect } from 'aws-amplify/auth';
import { awsConfig } from './awsConfig';

// Initialize the Cognito client
export const cognitoClient = new CognitoIdentityProviderClient({
  region: awsConfig.region,
});

// Helper function to set authentication state
const setAuthState = (provider: string) => {
  localStorage.setItem('provider', provider);
  localStorage.setItem("isAuthenticated", "true");
};

// Initiate login with Microsoft
export const initiateLoginWithMicrosoft = async () => {
  setAuthState('microsoft');
  try {
    await signInWithRedirect({
      provider: {
        custom: 'MicrosoftEntraID',
      },
    });
  } catch (error) {
    throw error;
  }
};

// Initiate login with Google
export const initiateLoginWithGoogle = async () => {
  setAuthState('google');
  try {
    await signInWithRedirect({
      provider: 'Google',
    });
  } catch (error) {
    throw error;
  }
};