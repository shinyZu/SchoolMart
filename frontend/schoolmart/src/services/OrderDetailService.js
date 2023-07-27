import axios from "../axios";
import qs from "qs";

class OrderDetailService {
  getAllByAdmin = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const promise = new Promise((resolve, reject) => {
      axios
        .get("orderdetails/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  getAllByUserId = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const promise = new Promise((resolve, reject) => {
      axios
        .get("orderdetails/user/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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

export default new OrderDetailService();
