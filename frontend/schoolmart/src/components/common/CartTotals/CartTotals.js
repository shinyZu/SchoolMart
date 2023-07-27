import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CancelIcon from "@mui/icons-material/Cancel";

import QtyChanger from "../QtyChanger/QtyChanger";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import img_item_1 from "../../../assets/images/Home/Category/ct_pens.jpg";

const CartTotals = (props) => {
  const { classes } = props;
  return (
    <>
      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className={classes.final_prices_container}
        display="flex"
      >
        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.subtotal_container}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h7" className={classes.cart_total_title}>
            Subtotal
          </Typography>

          <Typography variant="h7" className={classes.cart_total_title}>
            LKR {props.subtotal}.00
          </Typography>
        </Grid>

        {props.mode !== "history" ? (
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.coupon_container}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h7" className={classes.cart_total_title}>
              Coupon
            </Typography>

            <Typography variant="h7" className={classes.cart_total_title}>
              LKR {props.coupon}.00
            </Typography>
          </Grid>
        ) : null}

        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.shipping_container}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h7" className={classes.cart_total_title}>
            Shipping
          </Typography>

          <Typography variant="h7" className={classes.cart_total_title}>
            LKR {props.shipping}.00
          </Typography>
        </Grid>

        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.shipping_container}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h7" className={classes.cart_total_title}>
            Discount
          </Typography>

          <Typography variant="h7" className={classes.cart_total_title}>
            LKR {props.discount}.00
          </Typography>
        </Grid>

        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.total_cost_container}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h5" className={classes.cart_total_title}>
            Total
          </Typography>

          <Typography variant="h5" className={classes.cart_total_title}>
            LKR{" "}
            {props.subtotal + props.shipping - props.coupon - props.discount}.00
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

// export default MyButton;
export default withStyles(styleSheet)(CartTotals);
