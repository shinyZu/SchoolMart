import axios from "../axios";
import qs from "qs";

class CategoryService {
  getAll = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const promise = new Promise((resolve, reject) => {
      axios
        .get("category/getAll", {
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

  getNextId = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const promise = new Promise((resolve, reject) => {
      axios
        .get("category/next/id", {
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

  saveCategory = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const promise = new Promise((resolve, reject) => {
      axios
        .post("category", data, {
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

  updateCategory = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));
    let id = data.category_id;
    const promise = new Promise((resolve, reject) => {
      axios
        .put("category/" + id, data, {
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

  deleteCategory = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const promise = new Promise((resolve, reject) => {
      axios
        .delete("category/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
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

export default new CategoryService();
