import { useAuthState } from "./useAuthState";

export const useIsSignedIn = () => {
  const authState = useAuthState();
  const signedIn = authState.authentication.signedIn;

  return signedIn;
};
