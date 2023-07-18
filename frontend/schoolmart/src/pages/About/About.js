import React from "react";

import Header from "../../components/Header/Header";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const About = (props) => {
  const { classes } = props;
  return (
    <div id="home">
      <Header />
    </div>
  );
};

export default withStyles(styleSheet)(About);
