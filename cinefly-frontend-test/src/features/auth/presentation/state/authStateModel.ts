import { AuthUserModel } from "../../data/models/authUserModel";

class AuthState {
  constructor(public state: AuthUserModel) {}

  get signedIn(): boolean {
    return this.state.id !== "" && this.state.username !== "";
  }

  copyWith: (newProps: UpdateAuthStateProps) => AuthState = (
    newProps: UpdateAuthStateProps
  ) => {
    return new AuthState({
      id: newProps.id ?? this.state.id,
      username: newProps.username ?? this.state.username,
      role: newProps.role ?? this.state.role,
    });
  };
}

export interface UpdateAuthStateProps {
  id?: string;
  username?: string;
  role?: "admin" | "editor";
}
export default AuthState;
