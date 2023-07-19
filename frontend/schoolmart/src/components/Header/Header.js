import React from "react";

import Navbar from "../Navbar/Navbar";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const Header = (props) => {
  const { classes } = props;
  return (
    <div id="header">
      <Navbar />
    </div>
  );
};

export default withStyles(styleSheet)(Header);
