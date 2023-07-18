import React from "react";

import Navbar from "../Navbar/Navbar";
import Navbar2 from "../Navbar/Navbar_2";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const Header = (props) => {
  const { classes } = props;
  return (
    <div id="header">
      <Navbar />
      {/* <Navbar2 /> */}
    </div>
  );
};

export default withStyles(styleSheet)(Header);
