import { AsyncResult } from "../../../../core/typedefs/asyncResult";
import { SuccessModel } from "../../data/models/successModel";
import AuthRepo from "../repos/authRepo";

class Logout {
  constructor(private repo: AuthRepo) {}
  call: () => AsyncResult<SuccessModel> = () => {
    return this.repo.logout();
  };
}

export default Logout;
