import React, { useState } from "react";
import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import styles from "./LoginForm.module.css";
import MyTextField from "../../components/common/MyTextField/MyTextField";

const LoginForm = (props) => {
  const { classes, onLogin } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("LoginForm.js : " + username + " " + password);
    onLogin(username, password);
  };

  const openRegisterForm = (e) => {
    console.log(e);
  };

  return (
    <div className={classes.login_container}>
      <div className={styles.glass_container}>
        <h1 className={classes.login_text}>
          {/* Unlock the Access to Quality Education Resources! */}
          Discover the Tools for Academic Success...!
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className={classes.login_text}>Email :</label>
            {/* <input
              id="f_login"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.login_text}
            /> */}
            <MyTextField
              variant="filled"
              type="text"
              id="username"
              //   placeholder="Email"
              //   value={latitude}
              //   onChange={(e) => setLatitude(e.target.value)}
              style={{
                width: "100%",
                paddingTop: "5px",
              }}
            />
          </div>
          <br />
          <div>
            <label className={classes.login_text}>Password :</label>
            {/* <input
              id="f_pwd"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.login_text}
            /> */}
            <MyTextField
              variant="filled"
              type="password"
              id="password"
              //   placeholder="At least 8 characters"
              //   value={latitude}
              //   onChange={(e) => setLatitude(e.target.value)}
              style={{ width: "100%", paddingTop: "5px" }}
            />
          </div>
          <br />
          <div className={classes.login_footer}>
            <button className={classes.btn_login} type="submit">
              Login
            </button>
            <small className={classes.login_footer_text}>
              Not a member?{" "}
              <u>
                <a className={classes.txt_register} onClick={openRegisterForm}>
                  Register
                </a>
              </u>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default LoginForm;
export default withStyles(styleSheet)(LoginForm);
