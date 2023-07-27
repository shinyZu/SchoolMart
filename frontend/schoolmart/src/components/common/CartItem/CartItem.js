import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import QtyChanger from "../QtyChanger/QtyChanger";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import img_item_1 from "../../../assets/images/Home/Category/ct_pens.jpg";

const CartItem = (props) => {
  const { classes, item } = props;

  const [qty, setQty] = useState(item.qty);

  const increaseQty = (v) => {
    setQty(v);
    props.onUpdate(props.index, v);
  };

  const decreaseQty = (v) => {
    console.log(qty);
    let q;
    // if (qty == 1) {
    //   console.log(item.unit_price);
    //   setQty(1);
    //   q = item.unit_price;
    // } else {
    //   setQty(v);
    //   q = v;
    // }
    setQty(v);
    props.onUpdate(props.index, v);
  };

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
          <QtyChanger
            // qty={item.qty}
            index={props.index}
            qty={qty}
            onIncrease={increaseQty}
            // onDecrease={decreaseQty}
            onDecrease={decreaseQty}
          />
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
            {/* LKR {item.unit_price * item.qty}.00 */}
            {item.qty == 1
              ? `LKR ${item.unit_price}.00`
              : `LKR ${item.unit_price * qty}.00`}
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
          {props.mode !== "view" ? (
            <CancelIcon
              className={classes.btn_cancel}
              onClick={(e, v) => {
                console.log("Delete clicked");
                console.log(props.index);
                props.onDelete(props.index);
              }}
            />
          ) : (
            <CheckCircleIcon className={classes.btn_done} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

// export default MyButton;
export default withStyles(styleSheet)(CartItem);
