import { UpdateAuthStateProps } from "../authStateModel";
import { useAuthState } from "./useAuthState";

export const useUpdateAuthState: () => (
  newAuthentication: UpdateAuthStateProps
) => void = () => {
  const authState = useAuthState();
  const updateAuthStateFn = authState.updateAuthentication;
  return updateAuthStateFn;
};
