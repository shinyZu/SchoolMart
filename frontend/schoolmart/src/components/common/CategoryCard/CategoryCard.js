import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const CategoryCard = (props) => {
  const { classes } = props;
  return (
    <>
      <Grid
        item
        xl={3}
        lg={3}
        md={3}
        sm={6}
        xs={12}
        className={classes.card}
        onClick={props.onClick}
        key={props.index}
      >
        <Typography variant="h6" className={classes.txt_category}>
          {props.title}
        </Typography>
      </Grid>
    </>
  );
};

export default withStyles(styleSheet)(CategoryCard);
