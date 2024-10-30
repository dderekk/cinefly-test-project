import { AsyncResult } from "../../../../core/typedefs/asyncResult";
import { AuthUserModel } from "../../data/models/authUserModel";
import AuthRepo from "../repos/authRepo";

class Login {
  constructor(private repo: AuthRepo) {}

  call: (username: string) => AsyncResult<AuthUserModel> = (
    username: string
  ) => {
    return this.repo.login(username);
  };
}

export default Login;
