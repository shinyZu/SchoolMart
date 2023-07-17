import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import styles from "./RegisterForm.module.css";
import MyTextField from "../common/MyTextField/MyTextField";
import MySnackBar from "../../components/common/MySnackBar/MySnackbar";

const RegisterForm = (props) => {
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

  const openLoginForm = (e) => {
    console.log(e);
  };

  return (
    // <div className={styles.login_container}>
    <div className={classes.login_container}>
      <div className={styles.glass_container}>
        <h1 className={classes.login_text}>
          Unlock the Access to Quality Education Resources..!
          {/* Discover the Tools for Academic Success...! */}
        </h1>
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
          <TextValidator
            label="Address"
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            required={true}
            style={{ marginBottom: "20px" }}
            // validators={["matchRegexp:^[A-z|0-9]{4,}@(gmail)(.com|.lk)$"]}
            // errorMessages={["Invalid email address"]}
            // value={loginFormData.email}
            // onChange={(e) => {
            //   setLoginFormData({
            //     ...loginFormData,
            //     email: e.target.value,
            //   });
            // }}
          />
          <TextValidator
            label="Contact No"
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            required={true}
            style={{ marginBottom: "20px" }}
            validators={["matchRegexp:^[0-9]*10$"]}
            // errorMessages={["Invalid email address"]}
            // value={loginFormData.email}
            // onChange={(e) => {
            //   setLoginFormData({
            //     ...loginFormData,
            //     email: e.target.value,
            //   });
            // }}
          />
          <TextValidator
            label="Admin Verification Code"
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            // required={true}
            // style={{ marginBottom: "20px" }}
            validators={["matchRegexp:^[0-9]*6$"]}
            errorMessages={["Invalid verification code."]}
            // value={loginFormData.email}
            // onChange={(e) => {
            //   setLoginFormData({
            //     ...loginFormData,
            //     email: e.target.value,
            //   });
            // }}
          />
        </ValidatorForm>
        <br />
        <div className={classes.login_footer}>
          <button className={classes.btn_login} type="submit">
            Register
          </button>
          <small className={classes.login_footer_text}>
            Already a member?{" "}
            <u>
              <Link
                to="#register"
                className={classes.txt_register}
                // onClick={() => {
                //   props.onSwitch();
                // }}
              >
                Login
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

export default withStyles(styleSheet)(RegisterForm);
