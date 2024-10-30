import { AsyncResult } from "../../../../core/typedefs/asyncResult";
import { AuthUserModel } from "../../data/models/authUserModel";
import { SuccessModel } from "../../data/models/successModel";

abstract class AuthRepo {
  abstract login: (username: string) => AsyncResult<AuthUserModel>;
  abstract logout: () => AsyncResult<SuccessModel>;
  abstract signUp: (username: string) => AsyncResult<AuthUserModel>;
}

export default AuthRepo;
