import { left, right } from "fp-ts/lib/Either";
import {
  AuthException,
  ServerException,
} from "../../../../core/errors/exceptions";
import {
  ServerFailure,
  UnknownFailure,
} from "../../../../core/errors/failures";
import { AsyncResult } from "../../../../core/typedefs/asyncResult";
import AuthRepo from "../../domain/repos/authRepo";
import AuthDatasource from "../datasources/authDatasource";
import { AuthUserModel } from "../models/authUserModel";
import { SuccessModel } from "../models/successModel";

class AuthRepoImplementation implements AuthRepo {
  constructor(private datasource: AuthDatasource) {}
  login: (username: string) => AsyncResult<AuthUserModel> = async (
    username: string
  ) => {
    try {
      const result = await this.datasource.login(username);
      return right(result);
    } catch (exception) {
      if (exception instanceof AuthException) {
        throw exception;
        // return left(AuthFailure.fromException(exception));
      }
      throw exception;
      // return left(new UnknownFailure("Unknown Error Has Occurred", 500));
    }
  };

  logout: () => AsyncResult<SuccessModel> = async () => {
    try {
      const result = await this.datasource.logout();
      return right(result);
    } catch (exception) {
      if (exception instanceof ServerException) {
        return left(ServerFailure.fromException(exception));
      }
      return left(new UnknownFailure("Unknown Error Has Occurred", 500));
    }
  };

  signUp: (username: string) => AsyncResult<AuthUserModel> = async (
    username: string
  ) => {
    try {
      const result = await this.datasource.signUp(username);
      return right(result);
    } catch (exception) {
      if (exception instanceof AuthException) {
        throw exception;
      }
      throw exception;
    }
  };
}

export default AuthRepoImplementation;
