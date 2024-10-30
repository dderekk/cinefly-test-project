import { useContext } from "react";
import { AuthStateContext, AuthStateContextProps } from "../authStateProvider";

export const useAuthState = (): AuthStateContextProps => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within an AuthStateProvider");
  }
  return context;
};
