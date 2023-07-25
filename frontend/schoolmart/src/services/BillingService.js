import axios from "../axios";
import qs from "qs";

const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU3VuIEp1bCAyMyAyMDIzIDEyOjA4OjM1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MiwidXNlcm5hbWUiOiJqb2huQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDg1cGV6ckFlZXoudDIxVFkxNnpTR3VXb3lPbmJvd2RUbnlRZG5RamdpTmt3SThXM1hsREZXIiwidXNlcl9yb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTAwOTQzMTV9.3T8GitgFUBj2A7y6MJQd048RGlg1lFxfZF3pVpOAFhg";

//   userid = 4 - Ben
const customerToken1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVHVlIEp1bCAyNSAyMDIzIDEzOjU1OjEwIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6NCwidXNlcm5hbWUiOiJiZW45OUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQxOFdIbkxYRHl3UU5YSkVkQmI3b2plbmZIUW1iUkVTYU92SEJzT0NZM0lqc3doM3hzbVdmZSIsInVzZXJfcm9sZSI6IkN1c3RvbWVyIiwiaWF0IjoxNjkwMjczNTEwfQ.rDA9g7tkI4eFXPYOBv14ubcr0uNYwqBCJjZq44g07Xk";

//   userid = 3 - Brandon
const customerToken2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVHVlIEp1bCAyNSAyMDIzIDE2OjI0OjQ3IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MywidXNlcm5hbWUiOiJicmFuZG9uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJHg0WDRZYjVsMXlDRFRLQS9DamdTMy5rTFBiYjZ5SkRGcE5OL20vcy9UTkZWNklSNWw1TDF5IiwidXNlcl9yb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTAyODI0ODd9.u6de9qT9Xy8QUiDsaFANYWQPNhPjD-mYmVhE3S_GOAo";

class BillingService {
  getAllByCustomerId = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get("billingdetails/user/getAll", {
          headers: {
            Authorization: `Bearer ${customerToken2}`,
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
    const promise = new Promise((resolve, reject) => {
      axios
        .post("billingdetails", data, {
          headers: {
            Authorization: `Bearer ${customerToken2}`,
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
    const promise = new Promise((resolve, reject) => {
      axios
        .put("billingdetails", data, {
          headers: {
            Authorization: `Bearer ${customerToken2}`,
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
