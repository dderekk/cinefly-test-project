import { useUpdateAuthState } from "./useUpdateAuthState";

export const useHandleLogout = () => {
  const updateAuthState = useUpdateAuthState();
  return () => updateAuthState({ id: "", role: "editor", username: "" });
};
