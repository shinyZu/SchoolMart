import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Header from "../../components/Header/Header";
import QtyChanger from "../../components/common/QtyChanger/QtyChanger";
import CartItem from "../../components/common/CartItem/CartItem";
import CartTotals from "../../components/common/CartTotals/CartTotals";
import MyTextField from "../../components/common/MyTextField/MyTextField";
import MyButton from "../../components/common/MyButton/MyButton";
import Footer from "../../components/Footer/Footer";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const cartItems = [
  {
    img_url: "https://drive.google.com/uc?id=1udcfVrDsgSqJEZnTGhjHxH3NDyd17EAe",
    productName: "Product 01",
    price: 180.0,
    qty: 1,
    subtotal: 180.0,
  },
  {
    img_url: "https://drive.google.com/uc?id=1pE7g9RUBB27Gu9l46bnFBkwvaKBhP_D9",
    productName: "Product 02",
    price: 100.0,
    qty: 3,
    subtotal: 300.0,
  },
  {
    img_url: "https://drive.google.com/uc?id=195Fima7KXJJuN0X0vf2fCIU6gSQwEvsK",
    productName: "Product 03",
    price: 500.0,
    qty: 3,
    subtotal: 1500.0,
  },
];

const Cart = (props) => {
  const { classes } = props;
  const [couponValue, setCouponValue] = useState(0.0);
  const [finalSubtotal, setFinalSubTotal] = useState(0);

  useEffect(() => {
    let final_subtotal = 0;
    for (let item of cartItems) {
      final_subtotal += item.subtotal;
      console.log(final_subtotal);
      setFinalSubTotal(final_subtotal);
    }
  }, [finalSubtotal]);

  return (
    <div id="home">
      <Header />

      <Box sx={{ flexGrow: 1 }} className={classes.box_container}>
        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={6}
          xs={6}
          className={classes.main_container}
          display="flex"
          // justifyContent="center"
        >
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.title_container}
            display="flex"
            justifyContent="center"
          >
            <Typography variant="h3" className={classes.txt_title}>
              Cart
            </Typography>
          </Grid>

          {/* --------Cart List ------------------- */}

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.cart_container}
            display="flex"
            justifyContent="center"
          >
            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.tbl_headers_container}
              display="flex"
              justifyContent="space-around"
            >
              <Typography variant="h5" className={classes.tbl_headers}>
                Product
              </Typography>

              <Typography variant="h5" className={classes.tbl_headers}>
                Price
              </Typography>

              <Typography variant="h5" className={classes.tbl_headers}>
                Quantity
              </Typography>

              <Typography variant="h5" className={classes.tbl_headers}>
                Subtotal
              </Typography>
            </Grid>

            {/* ----------------------------Table items--------------------------- */}

            {cartItems.map((item, index) => {
              return <CartItem key={index} item={item} />;
            })}
          </Grid>

          {/* ----------------------Coupon Info & Cart Total Info -------------------- */}

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={6}
            xs={6}
            className={classes.cart_totals_container}
            display="flex"
            justifyContent="space-between"
          >
            {/* ------------ Coupon Info --------------- */}
            <Grid
              container
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={4}
              className={classes.coupon_info_container}
              display="flex"
              flexDirection="column"
            >
              <MyTextField
                variant="outlined"
                type="text"
                id="coupon"
                value={couponValue}
                onChange={(e) => {
                  setCouponValue(e.target.value);
                }}
                style={{ width: "100%", paddingTop: "5px" }}
              />

              <p>If you have a coupon, please apply it above.</p>

              <MyButton
                label="Apply Coupon"
                size="small"
                variant="outlined"
                type="button"
                className={classes.btn_apply_coupon}
                onClick={(e) => {
                  console.log("Coupon Applied");
                }}
              />
            </Grid>

            {/* ------------ Cart Totals Info --------------- */}
            <Grid
              container
              xl={5.8}
              lg={5.8}
              md={5.8}
              sm={5.8}
              xs={5.8}
              className={classes.total_info_container}
              display="flex"
            >
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.total_title_container}
                display="flex"
              >
                <Typography variant="h5" className={classes.cart_total_title}>
                  Cart Totals
                </Typography>
              </Grid>

              <CartTotals
                subtotal={finalSubtotal}
                coupon={couponValue}
                shipping={0.0}
                discount={0.0}
              />

              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.proceed_btn_container}
              >
                <Link
                  to="/cart/checkout"
                  state={{
                    coupon: couponValue,
                  }}
                >
                  <MyButton
                    label="PROCEED TO CHECKOUT"
                    size="large"
                    variant="outlined"
                    type="button"
                    className={classes.btn_proceed_checkout}
                    style={{ width: "100%", height: "90%" }}
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* ------------- Footer -------------- */}
      <Footer />
    </div>
  );
};

export default withStyles(styleSheet)(Cart);
