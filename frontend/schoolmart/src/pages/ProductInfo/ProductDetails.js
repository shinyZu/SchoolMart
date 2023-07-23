import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import QtyChanger from "../../components/common/QtyChanger/QtyChanger";
import MyButton from "../../components/common/MyButton/MyButton";
import ProductCard from "../../components/common/ProductCard/ProductCard";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import CategoryService from "../../services/CategoryService";
import StationeryService from "../../services/StationeryService";

// const relatedProducts = [
//   {
//     img: "",
//     category: "Category 1",
//     productName: "Product 1",
//     price: "00.00",
//   },
//   {
//     img: "",
//     category: "Category 1",
//     productName: "Product 1",
//     price: "00.00",
//   },
//   {
//     img: "",
//     category: "Category 1",
//     productName: "Product 1",
//     price: "00.00",
//   },
//   {
//     img: "",
//     category: "Category 1",
//     productName: "Product 1",
//     price: "00.00",
//   },
// ];

const ProductDetails = (props) => {
  const { classes } = props;
  const navigate = useNavigate();

  const location = useLocation();
  const productData = location.state;

  const [qty, setQty] = useState(1);
  const [categories, setCategories] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (categories != []) {
      getAllRelatedProducts();
    }
  }, [categories]);

  const getAllCategories = async () => {
    console.log("Get all categories");
    let res = await CategoryService.getAll();

    if (res.status == 200) {
      if (res.data.data != []) {
        console.log(res.data.data);
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

  const getAllRelatedProducts = async () => {
    console.log("Get all related products");
    console.log(productData.product.category_id);
    let res = await StationeryService.getAllProductsByCategoryId(
      productData.product.category_id
    );

    let productsByCategory = res.data.data;

    setRelatedProducts([]);
    productsByCategory.map((product, index) => {
      categories.map((category, index) => {
        if (category.categoryId === product.category_id) {
          setRelatedProducts((prev) => {
            return [
              ...prev,
              {
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
    console.log(relatedProducts);
  };

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
            style={{ backgroundImage: `url(${productData.product.image_url})` }}
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
                {productData.product.category}
              </Typography>
              <Typography variant="h7" className={classes.txt_prod_name}>
                {productData.product.st_name}
              </Typography>
              <Typography variant="h7" className={classes.txt_prod_price}>
                LKR {productData.product.unit_price}.00
              </Typography>
              <p className={classes.container_right_1_para}>
                Lorem ipsum dolor sit amet et delectus accommodare his consul
                copiosae legendos at vix ad putent delectus delicata usu. Vidit
                Lorem ipsum dolor sit amet et delectus accommodare his consul
                copiosae legendos at vix ad putent delectus delicata usu. Vidit
                Lorem ipsum dolor sit amet et delectus accommodare his consul
                copiosae legendos at vix ad putent delectus delicata usu.
              </p>

              {/* ---------Qty Changer----------------- */}
              <QtyChanger qty={qty} />
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
              <Link to="/cart">
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
                while (index < relatedProducts.length) {
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
                }
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
