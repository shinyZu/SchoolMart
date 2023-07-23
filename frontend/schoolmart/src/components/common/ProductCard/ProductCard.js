import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const ProductCard = (props) => {
  const { classes } = props;
  const { category, st_name, unit_price, image_url } = props.product;
  return (
    <>
      <Grid
        container
        xl={props.cardWidth}
        lg={2.5}
        md={2.5}
        sm={6}
        xs={12}
        className={classes.card}
        onClick={props.onClick}
      >
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{ backgroundImage: `url(${image_url})` }}
          className={classes.card_img}
        ></Grid>
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.card_description}
          display="flex"
          flexDirection="column"
        >
          <Typography variant="h8" className={classes.txt_prod_ctg}>
            {category}
          </Typography>
          <Typography variant="h7" className={classes.txt_prod_name}>
            {st_name}
          </Typography>
          <Typography variant="h7" className={classes.txt_prod_price}>
            LKR {unit_price}.00
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styleSheet)(ProductCard);
