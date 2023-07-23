import axios from "../axios";
import qs from "qs";

// Get from LocalStorage
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU3VuIEp1bCAyMyAyMDIzIDEyOjA4OjM1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MiwidXNlcm5hbWUiOiJqb2huQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDg1cGV6ckFlZXoudDIxVFkxNnpTR3VXb3lPbmJvd2RUbnlRZG5RamdpTmt3SThXM1hsREZXIiwidXNlcl9yb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTAwOTQzMTV9.3T8GitgFUBj2A7y6MJQd048RGlg1lFxfZF3pVpOAFhg";

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

  getNextId = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("stationery/next/id", {
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

  // Without image
  saveProduct = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post("stationery", data, {
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

  // WITH image
  saveProductWithImage = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post("stationery/drive/url/prod", data, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "multipart/form-data",
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

  // Update only product
  updateProduct = async (data, id) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put("stationery/" + id, data, {
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

  // Update only image
  updateImage = async (st_code, data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put("stationery/drive/url/db/" + st_code, data, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "multipart/form-data",
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

  // Delete product & Image
  deleteProduct = async (id) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .delete("stationery/drive/" + id, {
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

export default new StationeryService();
