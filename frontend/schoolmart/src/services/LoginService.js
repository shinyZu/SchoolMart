import axios from "../axios";
import qs from "qs";

const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU3VuIEp1bCAyMyAyMDIzIDEyOjA4OjM1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MiwidXNlcm5hbWUiOiJqb2huQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDg1cGV6ckFlZXoudDIxVFkxNnpTR3VXb3lPbmJvd2RUbnlRZG5RamdpTmt3SThXM1hsREZXIiwidXNlcl9yb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTAwOTQzMTV9.3T8GitgFUBj2A7y6MJQd048RGlg1lFxfZF3pVpOAFhg";

const customerToken1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVHVlIEp1bCAyNSAyMDIzIDEzOjU1OjEwIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6NCwidXNlcm5hbWUiOiJiZW45OUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQxOFdIbkxYRHl3UU5YSkVkQmI3b2plbmZIUW1iUkVTYU92SEJzT0NZM0lqc3doM3hzbVdmZSIsInVzZXJfcm9sZSI6IkN1c3RvbWVyIiwiaWF0IjoxNjkwMjczNTEwfQ.rDA9g7tkI4eFXPYOBv14ubcr0uNYwqBCJjZq44g07Xk";

const customerToken2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVHVlIEp1bCAyNSAyMDIzIDE2OjI0OjQ3IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MywidXNlcm5hbWUiOiJicmFuZG9uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJHg0WDRZYjVsMXlDRFRLQS9DamdTMy5rTFBiYjZ5SkRGcE5OL20vcy9UTkZWNklSNWw1TDF5IiwidXNlcl9yb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTAyODI0ODd9.u6de9qT9Xy8QUiDsaFANYWQPNhPjD-mYmVhE3S_GOAo";

class LoginService {
  login = async (data) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post("login", data)
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };

  logout = async (email) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .delete("login/logout/" + email)
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

export default new LoginService();
