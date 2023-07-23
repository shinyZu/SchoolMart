import axios from "../axios";
import qs from "qs";

const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU3VuIEp1bCAyMyAyMDIzIDEyOjA4OjM1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MiwidXNlcm5hbWUiOiJqb2huQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDg1cGV6ckFlZXoudDIxVFkxNnpTR3VXb3lPbmJvd2RUbnlRZG5RamdpTmt3SThXM1hsREZXIiwidXNlcl9yb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTAwOTQzMTV9.3T8GitgFUBj2A7y6MJQd048RGlg1lFxfZF3pVpOAFhg";

class CategoryService {
  getAll = async (toen) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("category/getAll", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
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
    const promise = new Promise((resolve, reject) => {
      axios
        .get("category/next/id", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
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
    const promise = new Promise((resolve, reject) => {
      axios
        .post("category", data, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
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
    let id = data.category_id;
    const promise = new Promise((resolve, reject) => {
      axios
        .put("category/" + id, data, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
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
    const promise = new Promise((resolve, reject) => {
      axios
        .delete("category/" + id, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
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
