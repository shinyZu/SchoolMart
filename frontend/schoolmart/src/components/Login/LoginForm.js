import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import styles from "./LoginForm.module.css";
import MyTextField from "../../components/common/MyTextField/MyTextField";
import MySnackBar from "../../components/common/MySnackBar/MySnackbar";

const LoginForm = (props) => {
  const { classes, onLogin } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [openErrorMessage, setOpenErrorMessage] = useState({
    open: "",
    alert: "",
    severity: "",
    variant: "",
  });

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
        {/* <form onSubmit={handleSubmit}>
          <div>
            <label className={classes.login_text}>Email :</label>
            <MyTextField
              variant="filled"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                paddingTop: "5px",
              }}
            />
          </div>
          <br />
          <div>
            <label className={classes.login_text}>Password :</label>
            <MyTextField
              variant="filled"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                <Link
                  to="#register"
                  className={classes.txt_register}
                  onClick={() => {
                    props.onSwitch();
                  }}
                >
                  Register
                </Link>
              </u>
            </small>
          </div>
        </form> */}

        <ValidatorForm className="pt-2" onSubmit={handleSubmit}>
          <TextValidator
            label="Email"
            type="email"
            variant="outlined"
            size="small"
            fullWidth
            required={true}
            style={{ marginBottom: "20px" }}
            validators={["matchRegexp:^[A-z|0-9]{4,}@(gmail)(.com|.lk)$"]}
            errorMessages={["Invalid email address"]}
            // value={loginFormData.email}
            // onChange={(e) => {
            //   setLoginFormData({
            //     ...loginFormData,
            //     email: e.target.value,
            //   });
            // }}
          />
          <TextValidator
            label="Password"
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            required={true}
            style={{ marginBottom: "20px" }}
            validators={["matchRegexp:^[A-z|0-9|@]{8,}$"]}
            errorMessages={["Must have atleast 8 characters"]}
            // value={loginFormData.password}
            // onChange={(e) => {
            //   setLoginFormData({
            //     ...loginFormData,
            //     password: e.target.value,
            //   });
            // }}
          />
        </ValidatorForm>
        <br />
        <div className={classes.login_footer}>
          <button className={classes.btn_login} type="submit">
            Login
          </button>
          <small className={classes.login_footer_text}>
            Not a member?{" "}
            <u>
              <Link
                to="#register"
                className={classes.txt_register}
                // onClick={() => {
                //   props.onSwitch();
                // }}
              >
                Register
              </Link>
            </u>
          </small>
        </div>
      </div>
      <MySnackBar
        open={openErrorMessage.open}
        alert={openErrorMessage.alert}
        severity={openErrorMessage.severity}
        variant={openErrorMessage.variant}
        onClose={() => {
          setOpenErrorMessage({ open: false });
        }}
      />
    </div>
  );
};

// export default LoginForm;
export default withStyles(styleSheet)(LoginForm);
