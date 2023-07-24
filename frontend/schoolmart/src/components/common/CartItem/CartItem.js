import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CancelIcon from "@mui/icons-material/Cancel";

import QtyChanger from "../QtyChanger/QtyChanger";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import img_item_1 from "../../../assets/images/Home/Category/ct_pens.jpg";

const CartItem = (props) => {
  const { classes, item } = props;
  console.log(item);

  // const [item, setItem] = useState(prod);

  // useEffect(() => {
  //   console.log(item);
  //   setItem(prod);
  // }, []);

  return (
    <>
      <Grid
        container
        columnGap={2}
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
          style={{ backgroundImage: `url(${item.image_url})` }}
        ></Grid>

        <Grid
          item
          xl={2.2}
          lg={2.2}
          md={2.2}
          sm={2.2}
          xs={2.2}
          className={classes.tbl_items_name_container}
          display="flex"
          // justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h7" className={classes.txt_item_values}>
            {item.st_name}
          </Typography>
        </Grid>

        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          className={classes.tbl_items_price_container}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h7" className={classes.txt_item_values}>
            LKR {item.unit_price}.00
          </Typography>
        </Grid>

        <Grid
          item
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={3}
          className={classes.tbl_items_qty_container}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <QtyChanger qty={item.qty} />
        </Grid>

        <Grid
          item
          xl={2.2}
          lg={2.2}
          md={2.2}
          sm={2.2}
          xs={2.2}
          className={classes.tbl_items_subtotal_container}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h7" className={classes.txt_item_values}>
            LKR {item.unit_price * item.qty}.00
          </Typography>
        </Grid>

        <Grid
          item
          xl={0.8}
          lg={0.8}
          md={0.8}
          sm={0.8}
          xs={0.8}
          className={classes.tbl_item_delete_container}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CancelIcon
            className={classes.btn_cancel}
            onClick={(e) => {
              console.log("Delete clicked");
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

// export default MyButton;
export default withStyles(styleSheet)(CartItem);
