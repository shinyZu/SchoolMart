import axios from "../axios";
import qs from "qs";

class StationeryService {
  getAll = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("stationery/getAll")
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

export default new StationeryService();
