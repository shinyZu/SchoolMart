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

const ProductDetails = (props) => {
  const { classes } = props;
  const navigate = useNavigate();

  const location = useLocation();
  const productData = location.state;
  const cartItemData = productData.product;
  console.log(cartItemData);

  const [qty, setQty] = useState(1);
  const [categories, setCategories] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    const savedCartItems = localStorage.getItem("cart");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [isLogged, setIsLogged] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (categories != []) {
      getAllRelatedProducts();
    }
  }, [categories]);

  const increaseQty = (v) => {
    setQty(v);
  };

  const decreaseQty = (v) => {
    console.log(qty);
    setQty(v);
  };

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

  const addToCart = (cart) => {
    console.log("=-------addToCart---------------");
    if (cart) {
      // check whether item already exists in the current cart
      const existingProductIndex = cart.findIndex(
        (item) => item.st_code === cartItemData.st_code
      );

      if (existingProductIndex !== -1) {
        console.log("if item exists------------");
        const itemsToBeupdated = [...cart];
        itemsToBeupdated[existingProductIndex].qty += qty;
        itemsToBeupdated[existingProductIndex].subtotal =
          itemsToBeupdated[existingProductIndex].unit_price *
          itemsToBeupdated[existingProductIndex].qty;
        setCart(itemsToBeupdated);
        setQty(itemsToBeupdated[existingProductIndex].qty + qty);
        localStorage.setItem("cart", JSON.stringify(itemsToBeupdated));
      } else {
        console.log("if item doesn't exist------------");
        let newItem = {
          category_id: cartItemData.category_id,
          category: cartItemData.category,
          st_code: cartItemData.st_code,
          st_name: cartItemData.st_name,
          unit_price: cartItemData.unit_price,
          image_url: cartItemData.image_url,
          qty: qty,
          subtotal: cartItemData.unit_price * qty,
        };
        console.log(newItem);
        console.log(cart);

        const updatedCart = [...cart, newItem];
        console.log(updatedCart);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
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
              <QtyChanger
                qty={qty}
                // onClick={(e, v) => {
                //   console.log(v);
                //   setQty(v);
                // }}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
              />
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
              {isLogged ? (
                <Link
                  to="/cart"
                  state={{
                    product: cartItemData,
                    wantedQty: { qty },
                  }}
                >
                  <MyButton
                    label="Add To Cart"
                    size="small"
                    variant="outlined"
                    type="button"
                    className={classes.btn_add_to_cart}
                    onClick={() => {
                      console.log("clicked AddToCart btn");
                      console.log(cart);
                      addToCart(cart);
                    }}
                  />
                </Link>
              ) : (
                <p style={{ color: "#c0392b" }}>
                  Please login to purchase products !
                </p>
              )}
              {/* <Link to="/cart"> */}
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
              // justifyContent="space-between"
            >
              {/* -------Product Card------------ */}
              {relatedProducts.map((product, index) => {
                while (index < relatedProducts.length) {
                  return (
                    <>
                      <ProductCard
                        key={index}
                        data={product}
                        onClick={(e) => {
                          console.log(product);
                          navigate("/product-details", {
                            state: { product: product },
                          });
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
