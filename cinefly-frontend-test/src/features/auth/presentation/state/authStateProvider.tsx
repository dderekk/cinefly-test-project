import { createContext, ReactNode, useState } from "react";
import AuthState, { UpdateAuthStateProps } from "./authStateModel";

export interface AuthStateContextProps {
  authentication: AuthState;
  updateAuthentication: (newAuthentication: UpdateAuthStateProps) => void;
}

export const AuthStateContext = createContext<
  AuthStateContextProps | undefined
>(undefined);

export const AuthStateProvider = ({
  children,
}: {
  readonly children: ReactNode;
}): JSX.Element => {
  const [authentication, setAuthentication] = useState<AuthState>(
    new AuthState({ id: "", role: "editor", username: "" })
  );

  const updateAuthentication = (
    newAuthenticationValues: UpdateAuthStateProps
  ) => {
    setAuthentication((prevAuth) => {
      return prevAuth.copyWith(newAuthenticationValues);
    });
  };

  return (
    <AuthStateContext.Provider value={{ authentication, updateAuthentication }}>
      {children}
    </AuthStateContext.Provider>
  );
};
