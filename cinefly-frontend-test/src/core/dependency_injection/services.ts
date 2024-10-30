import { AxiosInstance } from "axios";
import AuthDatasourceImplementation from "../../features/auth/data/datasources/authDatasourceImplementation";
import AuthRepoImplementation from "../../features/auth/data/domain/authRepoImplementation";
import { AuthUserModel } from "../../features/auth/data/models/authUserModel";
import { SuccessModel } from "../../features/auth/data/models/successModel";
import Login from "../../features/auth/domain/usecases/login";
import Logout from "../../features/auth/domain/usecases/logout";
import SignUp from "../../features/auth/domain/usecases/signUp";
import { AsyncResult } from "../typedefs/asyncResult";

export class Services {
  login: (username: string) => AsyncResult<AuthUserModel>;
  logout: () => AsyncResult<SuccessModel>;
  signUp: (username: string) => AsyncResult<AuthUserModel>;

  constructor(private httpClient: AxiosInstance) {
    const authRepo = new AuthRepoImplementation(
      new AuthDatasourceImplementation(httpClient)
    );
    this.login = new Login(authRepo).call;
    this.logout = new Logout(authRepo).call;
    this.signUp = new SignUp(authRepo).call;
  }
}
