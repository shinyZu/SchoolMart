import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MyButton from "../../components/common/MyButton/MyButton";
import ProductCard from "../../components/common/ProductCard/ProductCard";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const relatedProducts = [
  {
    img: "",
    category: "Category 1",
    productName: "Product 1",
    price: "00.00",
  },
  {
    img: "",
    category: "Category 1",
    productName: "Product 1",
    price: "00.00",
  },
  {
    img: "",
    category: "Category 1",
    productName: "Product 1",
    price: "00.00",
  },
  {
    img: "",
    category: "Category 1",
    productName: "Product 1",
    price: "00.00",
  },
];

const ProductDetails = (props) => {
  const { classes } = props;
  const navigate = useNavigate();

  return (
    <div id="home">
      <Header />

      <Box sx={{ flexGrow: 1 }} className={classes.box_container}>
        {/* ---------- Product Details --------------- */}

        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.main_container_1}
          justifyContent="space-between"
        >
          <Grid
            item
            xl={5.6}
            lg={5.6}
            md={5.6}
            sm={12}
            xs={12}
            className={classes.container_left}
          ></Grid>
          <Grid
            container
            xl={6.3}
            lg={6.3}
            md={6.3}
            sm={12}
            xs={12}
            className={classes.container_right}
          >
            <Grid
              item
              rowGap={0}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.container_right_1}
              display="flex"
              flexDirection="column"
              // alignItems="baseline"
            >
              <Typography variant="h8" className={classes.txt_prod_ctg}>
                Category
              </Typography>
              <Typography variant="h7" className={classes.txt_prod_name}>
                Product Name
              </Typography>
              <Typography variant="h7" className={classes.txt_prod_price}>
                LKR 00.00
              </Typography>
              <p className={classes.container_right_1_para}>
                Lorem ipsum dolor sit amet et delectus accommodare his consul
                copiosae legendos at vix ad putent delectus delicata usu. Vidit
                Lorem ipsum dolor sit amet et delectus accommodare his consul
                copiosae legendos at vix ad putent delectus delicata usu. Vidit
                Lorem ipsum dolor sit amet et delectus accommodare his consul
                copiosae legendos at vix ad putent delectus delicata usu.
              </p>

              <Grid
                container
                xl={3}
                lg={3}
                md={3}
                sm={12}
                xs={12}
                className={classes.container_right_1_0}
              >
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  className={classes.container_minus}
                  display="flex"
                  justifyContent="center"
                  onClick={(e) => {
                    console.log("qty -");
                  }}
                >
                  <Typography variant="h8" className={classes.txt_minus_plus}>
                    -
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  className={classes.container_qty}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography variant="h8" className={classes.txt_qty}>
                    1
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  className={classes.container_plus}
                  display="flex"
                  justifyContent="center"
                  onClick={(e) => {
                    console.log("qty +");
                  }}
                >
                  <Typography variant="h8" className={classes.txt_minus_plus}>
                    +
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className={classes.container_right_2}
              display="flex"
              alignItems="flex-end"
            >
              <Link to="/shop">
                <MyButton
                  label="Add To Cart"
                  size="small"
                  variant="outlined"
                  type="button"
                  className={classes.btn_add_to_cart}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>

        {/* ---------- Related Products --------------- */}
        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.main_container_2}
        >
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.container_2_0}
            display="flex"
            justifyContent="center"
          >
            <Typography variant="h3" className={classes.txt_title}>
              Related Products
            </Typography>
          </Grid>

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.container_2_1}
            display="flex"
            justifyContent="center"
          >
            <Grid
              // item
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
              justifyContent="space-between"
            >
              {/* -------Product Card------------ */}
              {relatedProducts.map((product, index) => {
                return (
                  <>
                    <ProductCard
                      key={index}
                      product={product}
                      onClick={(e) => {
                        navigate("/product-details");
                      }}
                      cardWidth={2.5}
                    />
                  </>
                );
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

export default withStyles(styleSheet)(ProductDetails);
