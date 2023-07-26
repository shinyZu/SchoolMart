import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import styles from "./LoginForm.module.css";
import MyTextField from "../../components/common/MyTextField/MyTextField";
import MySnackBar from "../../components/common/MySnackBar/MySnackbar";

import LoginService from "../../services/LoginService";

const LoginForm = (props) => {
  const { classes, onLogin } = props;
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const [openErrorMessage, setOpenErrorMessage] = useState({
    open: "",
    alert: "",
    severity: "",
    variant: "",
  });

  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    // Your validation logic for the email field
    const isValidEmail = /^[A-z|0-9]{4,}@(gmail)(.com|.lk)$/.test(emailValue);
    setEmailValid(isValidEmail);
    setLoginFormData({
      ...loginFormData,
      username: emailValue,
    });
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    // Your validation logic for the password field
    const isValidPassword = /^[A-z|0-9|@]{8,}$/.test(passwordValue);
    setPasswordValid(isValidPassword);
    setLoginFormData({
      ...loginFormData,
      password: passwordValue,
    });
  };

  const handleSubmit = async (e) => {
    console.log(loginFormData);
    console.log(isEmailValid && isPasswordValid);

    let res = await LoginService.login(loginFormData);
    console.log(res);

    if (res.status === 200) {
      if (res.data.data) {
        console.log(res.data.data);
        localStorage.setItem(
          "token",
          JSON.stringify(res.data.data.access_token)
        );
        // localStorage.setItem("isLoggedOut", false);
        alert(res.data.message);
        // props.onLogin(isEmailValid && isPasswordValid);
        navigate("/home");
      }
    } else {
      alert(res.response.data.message);
    }
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

        <ValidatorForm className="pt-2" /* onSubmit={handleSubmit} */>
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
            value={loginFormData.username}
            // onChange={(e) => {
            //   setLoginFormData({
            //     ...loginFormData,
            //     email: e.target.value,
            //   });
            // }}
            onChange={handleEmailChange}
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
            value={loginFormData.password}
            // onChange={(e) => {
            //   setLoginFormData({
            //     ...loginFormData,
            //     password: e.target.value,
            //   });
            // }}
            onChange={handlePasswordChange}
          />
        </ValidatorForm>
        <br />
        <div className={classes.login_footer}>
          <button
            // className={classes.btn_login}
            disabled={!(isEmailValid && isPasswordValid)}
            className={
              isEmailValid && isPasswordValid
                ? classes.btn_login
                : classes.btn_login_disabled
            }
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
              // console.log(e);
              // console.log(isEmailValid && isPasswordValid);
            }}
          >
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
