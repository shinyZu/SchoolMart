import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Header from "../../components/Header/Header";
import CartItem from "../../components/common/CartItem/CartItem";
import CartTotals from "../../components/common/CartTotals/CartTotals";
import MyTextField from "../../components/common/MyTextField/MyTextField";
import MyButton from "../../components/common/MyButton/MyButton";
import Footer from "../../components/Footer/Footer";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const OrderHistoryDetails = (props) => {
  const { classes } = props;
  const location = useLocation();
  let data = location.state;

  const [receivedData, setReceivedData] = useState(null);

  const [qty, setQty] = useState(0);
  const [cartItemData, setCartItemData] = useState({});

  const [orderDetailsList, setOrderDetailsList] = useState([]);

  const [item, setItem] = useState({
    st_name: "",
    image_url: "",
    unit_price: "",
    qty: "",
    subtotal: "",
  });

  const [couponValue, setCouponValue] = useState(0);
  const [itemSubtotal, setItemSubTotal] = useState(0);
  const [finalSubtotal, setFinalSubTotal] = useState(0);

  const [categories, setCategories] = useState([]);
  const [stationeryList, setStationeryList] = useState([]);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (data) {
      setOrderDetailsList([]);
      createOrderDetailsList();
    }
    console.log(orderDetailsList);
  }, []);

  useEffect(() => {
    calculateFinalSubTotal();
  }, [orderDetailsList]);

  //   useEffect(() => {
  //     calculateFinalSubTotal();
  //   }, [itemSubtotal]);

  const createOrderDetailsList = () => {
    console.log("=-------createOrderDetailsList---------------");
    let orderDetails = data.data.details;
    console.log(orderDetails);

    if (orderDetails) {
      for (const detail of orderDetails) {
        let item = {
          st_name: detail.st_name,
          image_url: detail.image_url,
          unit_price: detail.unit_price,
          qty: detail.order_details.order_qty,
          subtotal: detail.unit_price * detail.order_details.order_qty,
        };

        setOrderDetailsList((prev) => {
          return [...prev, item];
        });
      }
    }
  };

  //   const calculateSubTotalForEachOrderedItem = () => {
  //     console.log("=-------calculateSubTotalForEachOrderedItem---------------");
  //     let orderDetails = data.data.details;
  //     console.log(orderDetails);

  //     for (let detail of orderDetails) {
  //       let item_subtotal = 0;
  //       item_subtotal = detail.order_details.order_qty * detail.unit_price;
  //       console.log(item_subtotal);
  //       setItemSubTotal(item_subtotal);

  //       setItem({
  //         ...item,
  //         subtotal: item_subtotal,
  //       });
  //     }
  //   };

  const calculateFinalSubTotal = () => {
    console.log("=-------calculateFinalSubTotal---------------");
    console.log(orderDetailsList);
    // let orderDetails = data.data.details;

    if (orderDetailsList) {
      let final_subtotal = 0;

      for (let detail of orderDetailsList) {
        final_subtotal += detail.subtotal;
        console.log(final_subtotal);
        setFinalSubTotal(final_subtotal);
      }
    }
  };

  return (
    <>
      <Header />

      {data != null ? (
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
                Order ID : {data.data.order._id}
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

              {orderDetailsList.map((item, index) => {
                while (index < orderDetailsList.length) {
                  return <CartItem index={index} item={item} mode="view" />;
                }
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
              justifyContent="end"
            >
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
                    Order Totals
                  </Typography>
                </Grid>

                <CartTotals
                  mode="history"
                  subtotal={finalSubtotal}
                  coupon={couponValue}
                  shipping={0.0}
                  discount={0.0}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : null}

      {/* ------------- Footer -------------- */}
      <Footer />
    </>
  );
};

export default withStyles(styleSheet)(OrderHistoryDetails);
