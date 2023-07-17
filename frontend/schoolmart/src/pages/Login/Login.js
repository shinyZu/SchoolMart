import React from "react";
import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Register/RegisterForm";

// const Login = ({ onLogin }) => {
const Login = (props) => {
  const { classes, onLogin } = props;
  return (
    <div className={classes.login_container_1}>
      <LoginForm onLogin={onLogin} />
      {/* <RegisterForm onLogin={onLogin} /> */}
    </div>
  );
};

// export default Login;
export default withStyles(styleSheet)(Login);
