import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Header from "../../components/Header/Header";
import OrderHistoryCard from "../../components/common/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import OrderService from "../../services/OrderService";

const productList = [
  {
    category_id: 1,
    category: "Aasas",
    st_code: 1,
    st_name: "Pass",
    unit_price: 285,
    image_url:
      "https://drive.google.com/uc?id=1PbXp7mdN7uxXd8_KPDKwbidAU0TdJjAd",
  },
  {
    category_id: 1,
    category: "Aasas",
    st_code: 1,
    st_name: "Pass",
    unit_price: 285,
    image_url:
      "https://drive.google.com/uc?id=1PbXp7mdN7uxXd8_KPDKwbidAU0TdJjAd",
  },
  {
    category_id: 1,
    category: "Aasas",
    st_code: 1,
    st_name: "Pass",
    unit_price: 285,
    image_url:
      "https://drive.google.com/uc?id=1PbXp7mdN7uxXd8_KPDKwbidAU0TdJjAd",
  },
  {
    category_id: 1,
    category: "Aasas",
    st_code: 1,
    st_name: "Pass",
    unit_price: 285,
    image_url:
      "https://drive.google.com/uc?id=1PbXp7mdN7uxXd8_KPDKwbidAU0TdJjAd",
  },
  {
    category_id: 1,
    category: "Aasas",
    st_code: 1,
    st_name: "Pass",
    unit_price: 285,
    image_url:
      "https://drive.google.com/uc?id=1PbXp7mdN7uxXd8_KPDKwbidAU0TdJjAd",
  },
];
const OrderHistory = (props) => {
  const { classes } = props;
  const navigate = useNavigate();

  const [orderHistoryList, setOrderHistoryList] = useState([]);

  //   useEffect(() => {
  //     if (orderHistoryList.length != 0) {
  //       console.log("----------=-=-===================-----------------");
  //       console.log(orderHistoryList);
  //       console.log(orderHistoryList[0]); // Array
  //       console.log(orderHistoryList[0].order); // Order
  //       console.log(orderHistoryList[0].details); // All Details
  //       console.log(orderHistoryList[0].details[0]); //  Detail 1 (detail + img)
  //       console.log(orderHistoryList[0].details[0].order_details); //  Detail 1 - order_detail
  //       console.log(orderHistoryList[0].details[0].image_url); //  Detail 1 - img
  //     }
  //   });

  useEffect(() => {
    getLatestOrderHistoryOfCustomer();
  }, []);

  const getLatestOrderHistoryOfCustomer = async () => {
    let res = await OrderService.getOrderHistoryOfUser();

    if (res.status === 200) {
      console.log(res.data.data);
      setOrderHistoryList(res.data.data);
    }
  };

  return (
    <div id="header">
      <Header />

      <Box sx={{ flexGrow: 1 }} className={classes.box_container}>
        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.main_container}
          display="flex"
          justifyContent="space-between"
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
              Order History
            </Typography>
          </Grid>

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={6}
            xs={6}
            className={classes.container_1}
            display="flex"
          >
            <Grid
              container
              rowGap={3}
              columnGap={5}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.card_container}
              display="flex"
              //   justifyContent="space-between"
            >
              {orderHistoryList.map((historyData, index) => {
                return (
                  <>
                    <OrderHistoryCard
                      key={index}
                      page="history"
                      data={historyData}
                      onClick={(e) => {
                        navigate("/order/history/details", {
                          state: { data: historyData },
                        });
                      }}
                      cardWidth={2.5}
                    />
                  </>
                );
                // });
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* ------------- Footer -------------- */}
      <Footer />
    </div>
  );
};

export default withStyles(styleSheet)(OrderHistory);
