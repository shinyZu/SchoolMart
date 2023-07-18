import React from "react";

import Header from "../../components/Header/Header";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const Home = (props) => {
  const { classes } = props;
  return (
    <div id="home">
      <Header />
      {/* <Main /> */}
    </div>
  );
};

export default withStyles(styleSheet)(Home);
