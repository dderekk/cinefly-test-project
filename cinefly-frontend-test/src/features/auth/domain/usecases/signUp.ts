import { AsyncResult } from "../../../../core/typedefs/asyncResult";
import { AuthUserModel } from "../../data/models/authUserModel";
import AuthRepo from "../repos/authRepo";

class SignUp {
  constructor(private repo: AuthRepo) {}

  call: (username: string) => AsyncResult<AuthUserModel> = (
    username: string
  ) => {
    return this.repo.signUp(username);
  };
}

export default SignUp;
