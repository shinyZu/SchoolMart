import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CancelIcon from "@mui/icons-material/Cancel";

import QtyChanger from "../QtyChanger/QtyChanger";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import img_item_1 from "../../../assets/images/Home/Category/ct_pens.jpg";

const SummaryItem = (props) => {
  const { classes, item } = props;

  return (
    <>
      <Grid
        container
        columnGap={1}
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className={classes.tbl_items_container}
        display="flex"
      >
        <Grid
          container
          xl={1}
          lg={1}
          md={1}
          sm={1}
          xs={1}
          className={classes.tbl_items_img_container}
          style={{ backgroundImage: `url(${item.img_url})` }}
        ></Grid>

        <Grid
          item
          xl={4}
          lg={4}
          md={4}
          sm={4}
          xs={4}
          className={classes.tbl_items_name_container}
          display="flex"
          // justifyContent="end"
          alignItems="center"
        >
          <Typography variant="h7" className={classes.txt_item_values}>
            {item.productName} X {item.qty}
          </Typography>
        </Grid>

        <Grid
          item
          xl={6.6}
          lg={6.6}
          md={6.6}
          sm={6.6}
          xs={6.6}
          className={classes.tbl_items_subtotal_container}
          display="flex"
          justifyContent="end"
          alignItems="center"
        >
          <Typography variant="h7" className={classes.txt_item_values}>
            LKR {item.subtotal}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

// export default MyButton;
export default withStyles(styleSheet)(SummaryItem);
