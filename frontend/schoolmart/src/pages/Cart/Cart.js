import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
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

import StationeryService from "../../services/StationeryService";
import CategoryService from "../../services/CategoryService";

const Cart = (props) => {
  const { classes } = props;
  const location = useLocation();
  let data = location.state;

  // const [receivedData, setReceivedData] = useState(location.state);
  const [receivedData, setReceivedData] = useState(null);
  // const storedItems = localStorage.getItem("cartProducts");

  const [qty, setQty] = useState(0);
  const [cartItemData, setCartItemData] = useState({});
  //   const [cartItems, setCartItems] = useState([]);

  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("test");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [couponValue, setCouponValue] = useState(0.0);
  const [finalSubtotal, setFinalSubTotal] = useState(0);

  const [categories, setCategories] = useState([]);
  const [stationeryList, setStationeryList] = useState([]);

  useEffect(() => {
    console.log("=-------UE-1---------------");
    console.log(cartItems);
    if (data) {
      setQty(data.wantedQty.data);
    }
    calculateFinalSubTotal();
  });

  useEffect(() => {
    console.log("=-------UE-2---------------");
    console.log("=-qty changed updated total-----");

    calculateFinalSubTotal();
    console.log(finalSubtotal);
  }, [qty]);

  const calculateFinalSubTotal = () => {
    console.log("=-------calculateFinalSubTotal---------------");
    const savedCartItems = localStorage.getItem("test");
    console.log(JSON.parse(savedCartItems));
    if (JSON.parse(savedCartItems)) {
      let final_subtotal = 0;
      for (let item of JSON.parse(savedCartItems)) {
        final_subtotal += item.subtotal;
        console.log(final_subtotal);
        setFinalSubTotal(final_subtotal);
      }
    }
  };

  const updateCart = (itemId, newQty) => {
    console.log("=-------updateCart---------------");
    const existingCartItem = cartItems.filter(
      (item, index) => index === itemId
    );
    console.log(newQty);
    existingCartItem[0].qty = newQty;
    console.log(existingCartItem);

    cartItems.map((cartProd, index) => {
      if (existingCartItem[0].st_code == cartProd.st_code) {
        cartProd.qty = newQty;
        cartProd.subtotal = cartProd.unit_price * newQty;
        console.log(newQty);
        if (newQty == 0) {
          console.log("subtotal should be equal to unit price");
          cartProd.qty = 1;
          cartProd.subtotal = cartProd.unit_price;
        }
      }
      console.log(cartProd);
    });
    console.log(cartItems);
    setCartItems(cartItems);

    localStorage.removeItem("test");
    localStorage.setItem("test", JSON.stringify(cartItems));
    calculateFinalSubTotal();
  };

  const removeFromCart = (itemId) => {
    console.log("=-------removeFromCart---------------");
    const updatedCart = cartItems.filter((item, index) => index !== itemId);
    setCartItems(updatedCart);
    console.log(updatedCart);
    localStorage.setItem("test", JSON.stringify(updatedCart));
    if (updatedCart.length == 0) {
      setFinalSubTotal(0);
    }
  };

  const getAllCategories = async () => {
    console.log("Get all categories");
    let res = await CategoryService.getAll();

    if (res.status == 200) {
      if (res.data.data != []) {
        // console.log(res.data.data);
        setCategories([]);
        res.data.data.map((category, index) => {
          setCategories((prev) => {
            return [
              ...prev,
              {
                categoryId: category.category_id,
                categoryTitle: category.category,
              },
            ];
          });
        });
      }
    }
  };

  const getAllStationery = async () => {
    console.log("Get all stationery");
    let res = await StationeryService.getAll();

    if (res.status === 200) {
      let allProducts = res.data.data;

      setStationeryList([]);
      allProducts.map((product, index) => {
        categories.map((category, index) => {
          if (category.categoryId === product.category_id) {
            setStationeryList((prev) => {
              return [
                ...prev,
                {
                  category_id: product.category_id,
                  category: category.categoryTitle,
                  st_name: product.st_name,
                  unit_price: product.unit_price,
                  image_url: product.image_url,
                },
              ];
            });
          }
        });
      });
    }
  };

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
              // while (index < cartItems.length) {
              return (
                <CartItem
                  index={index}
                  item={item}
                  onDelete={removeFromCart}
                  onUpdate={updateCart}
                />
              );
              // }
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
