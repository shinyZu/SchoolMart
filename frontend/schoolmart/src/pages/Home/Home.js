import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Header from "../../components/Header/Header";
import MyButton from "../../components/common/MyButton/MyButton";
import CategoryCard from "../../components/common/CategoryCard/CategoryCard";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import CategoryService from "../../services/CategoryService";
import StationeryService from "../../services/StationeryService";
import jwtDecode from "jwt-decode";

const Home = (props) => {
  const { classes } = props;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    console.log("---handling login in Home-----");
    // let token = localStorage.getItem("token");
    // console.log(token);
    // if (token) {
    //   props.handleLogin(true);
    //   // navigate("/home");
    // } else {
    //   props.handleLogin(false);
    //   // navigate("/home");
    // }

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      let user_role = decodedToken.user_role;

      if (user_role === "Admin") {
        console.log("-------is Admin in Home------");
        props.handleLogin(true, user_role);
        // navigate("/admin/panel");
      } else {
        console.log("-------is Customer in Home------");
        props.handleLogin(true, user_role);
        // navigate("/home");
      }
    } else {
      console.log("-------Both in Home------");
      props.handleLogin(false, "Both");
    }
  });

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (categories != []) {
      getNewArrivals();
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

  const getNewArrivals = async () => {
    console.log("Get new arivals");
    let res = await StationeryService.getNewArrivals();

    if (res.status == 200) {
      let lastSixProducts = res.data.data;

      setNewArrivals([]);
      lastSixProducts.map((product, index) => {
        categories.map((category, index) => {
          if (category.categoryId === product.category_id) {
            setNewArrivals((prev) => {
              return [
                ...prev,
                {
                  category_id: product.category_id,
                  category: category.categoryTitle,
                  st_code: product.st_code,
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
    <>
      <div id="home">
        <Header handleLogin={props.handleLogin} />
        <Box sx={{ flexGrow: 1 }} className={classes.box_container}>
          {/* --------First Container From Top--------------- */}
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.first_container}
          >
            <Grid container className={classes.container_1}>
              {/* ----Left Container ---------- */}

              <Grid item xs={6} className={classes.container_1_left}>
                <Grid item xs={12} className={classes.container_1_left_1}>
                  <Typography variant="h3" className={classes.txt_title}>
                    Your One-Stop Shop For All Your School Needs....
                  </Typography>
                </Grid>

                <Grid item xs={12} className={classes.container_1_left_2}>
                  <Typography
                    variant="h7"
                    className={classes.txt_title_description}
                  >
                    Your ultimate one-stop shop for all your school needs. We
                    understand the demands of the modern educational environment
                    and offer a comprehensive range of school items to meet
                    those needs. From textbooks to stationery, backpacks to art
                    supplies, we've got you covered. Experience the convenience
                    of finding everything you need in one place and simplify
                    your back-to-school shopping experience.
                  </Typography>
                </Grid>

                <Grid item xs={12} className={classes.container_1_left_3}>
                  <Link to="/shop">
                    <MyButton
                      label="Shop Now"
                      size="small"
                      variant="outlined"
                      type="button"
                      className={classes.btn_shop_now}
                    />
                  </Link>
                </Grid>
              </Grid>

              {/* ----Right Container ---------- */}

              <Grid container item xs={5} className={classes.container_1_right}>
                <Grid
                  item
                  xs={12}
                  className={classes.container_1_right_1}
                ></Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* --------Second Container - Top Categories --------------- */}
          <Grid container className={classes.second_container}>
            <Grid item xs={12} className={classes.container_2_0}>
              <Typography variant="h3" className={classes.txt_title}>
                Shop Our Top Categories
              </Typography>
            </Grid>
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.container_2_1}
            >
              <Grid
                // item
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.container_2_1_0}
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
                  className={classes.card_container_1}
                  display="flex"
                  // justifyContent="space-between"
                  justifyContent="center"
                >
                  {/* -------Category Card------------ */}
                  {categories.map((category, index) => {
                    while (index < 6) {
                      return (
                        <>
                          <CategoryCard
                            key={index}
                            title={category.categoryTitle}
                            onClick={(e) => {
                              navigate("/shop");
                            }}
                          />
                        </>
                      );
                    }
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* -------Third Container - New Arrivals-------------------- */}

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.third_container}
          >
            <Grid
              item
              xs={12}
              className={classes.container_3_0}
              display="flex"
              justifyContent="center"
            >
              <Typography variant="h3" className={classes.txt_title}>
                New Arrivals
              </Typography>
            </Grid>

            <Grid
              container
              xs={12}
              className={classes.container_3_1}
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
                className={classes.card_container_2}
                display="flex"
                // justifyContent="space-between"
                justifyContent="center"
              >
                {/* -------Product Card------------ */}
                {newArrivals.map((product, index) => {
                  while (index < 6) {
                    return (
                      <>
                        <ProductCard
                          key={index}
                          data={product}
                          onClick={(e) => {
                            navigate("/product-details", {
                              state: { product: product },
                            });
                          }}
                          cardWidth={3}
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
    </>
  );
};

export default withStyles(styleSheet)(Home);
