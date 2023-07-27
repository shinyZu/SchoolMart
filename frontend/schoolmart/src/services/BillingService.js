import axios from "../axios";
import qs from "qs";

class BillingService {
  getAllByCustomerId = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const promise = new Promise((resolve, reject) => {
      axios
        .get("billingdetails/user/getAll", {
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

  saveBillingDetails = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const promise = new Promise((resolve, reject) => {
      axios
        .post("billingdetails", data, {
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

  updateBillingDetails = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const promise = new Promise((resolve, reject) => {
      axios
        .put("billingdetails", data, {
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

export default new BillingService();
