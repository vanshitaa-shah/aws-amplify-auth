import { signInWithRedirect } from 'aws-amplify/auth';

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