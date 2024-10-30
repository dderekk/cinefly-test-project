import { useMutation } from "@tanstack/react-query";
import { Either, isLeft } from "fp-ts/lib/Either"; // Assuming you're using fp-ts for Either type
import { useServices } from "../../../../../core/dependency_injection/dep_injection";
import { Failure } from "../../../../../core/errors/failures";
import { AuthUserModel } from "../../../data/models/authUserModel";
import { useUpdateAuthState } from "./useUpdateAuthState";

export const useHandleLogin = () => {
  const services = useServices();
  const loginFn = services.login;
  const updateStateFn = useUpdateAuthState();

  const mutation = useMutation<Either<Failure, AuthUserModel>, Error, string>({
    mutationFn: (username) => loginFn(username),
    onSuccess: (data) => {
      if (isLeft(data)) {
      } else {
        updateStateFn(data.right);
      }
    },
  });

  return mutation;
};
