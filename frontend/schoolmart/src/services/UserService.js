import axios from "../axios";
import qs from "qs";

class UserService {
  registerUser = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post("user/register", data)
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };
}

export default new UserService();
