import { AuthUserModel } from "../models/authUserModel";
import { SuccessModel } from "../models/successModel";

abstract class AuthDatasource {
  abstract login: (username: string) => Promise<AuthUserModel>;
  abstract logout: () => Promise<SuccessModel>;
  abstract signUp: (username: string) => Promise<AuthUserModel>;
}

export default AuthDatasource;
