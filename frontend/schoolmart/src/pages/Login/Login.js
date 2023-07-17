import React from "react";
import LoginForm from "../../components/Login/LoginForm";
import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

// const Login = ({ onLogin }) => {
const Login = (props) => {
  const { classes, onLogin } = props;
  return (
    <div className={classes.login_container_1}>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

// export default Login;
export default withStyles(styleSheet)(Login);
