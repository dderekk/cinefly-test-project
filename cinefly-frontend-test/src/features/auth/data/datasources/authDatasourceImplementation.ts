import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {
  AuthException,
  UnknownException,
} from "../../../../core/errors/exceptions";
import { AuthUserModel } from "../models/authUserModel";
import { SuccessModel } from "../models/successModel";
import AuthDatasource from "./authDatasource";

class AuthDatasourceImplementation implements AuthDatasource {
  url: string;
  constructor(private httpClient: AxiosInstance) {
    this.url = "http://localhost:3001/api/auth";
  }

  login: (username: string) => Promise<AuthUserModel> = async (username) => {
    const endpoint = `${this.url}/login`;
    const body: AuthRequest = { username };
    try {
      const response: AxiosResponse<{ user: AuthUserModel }> =
        await this.httpClient.post<{ user: AuthUserModel }>(endpoint, body);
      return response.data.user;
    } catch (exception) {
      if (exception instanceof AxiosError) {
        throw new AuthException(
          exception.response?.data["message"] as string,
          exception.code
        );
      }
      throw new UnknownException("An Unknown Exception has occurred", 500);
    }
  };

  signUp: (username: string) => Promise<AuthUserModel> = async (username) => {
    const endpoint = `${this.url}/signUp`;
    const body: AuthRequest = { username };
    try {
      const response: AxiosResponse<{ user: AuthUserModel }> =
        await this.httpClient.post<{ user: AuthUserModel }>(endpoint, body);
      return response.data.user;
    } catch (exception) {
      if (exception instanceof AxiosError) {
        throw new AuthException(
          exception.response?.data["message"] as string,
          exception.code
        );
      }
      throw new UnknownException("An Unknown Exception has occurred", 500);
    }
  };

  logout: () => Promise<SuccessModel> = () => {
    const success: SuccessModel = { successful: true };
    return Promise.resolve(success);
  };
}

interface AuthRequest {
  username: string;
}

export default AuthDatasourceImplementation;
