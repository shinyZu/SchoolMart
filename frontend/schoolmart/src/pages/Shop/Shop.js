import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import Header from "../../components/Header/Header";
import MyToggleButtonGroup from "../../components/common/ToggleButton/MyToggleButtonGroup";
import MyCategoryChip from "../../components/common/MyCategoryChip/MyCategoryChip";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import StationeryService from "../../services/StationeryService";
import CategoryService from "../../services/CategoryService";

const sortTypes = ["Default", "Acending", "Descending"];

const Shop = (props) => {
  const { classes } = props;
  const navigate = useNavigate();

  // const [isAllSelected, setIsAllSelected] = useState(true);
  // const [isWritingSelected, setIsWritingSelected] = useState(false);
  // const [isBookSelected, setIsBookSelected] = useState(false);
  // const [isArtSelected, setIsArtSelected] = useState(false);
  // const [isAdhesiveSelected, setIsAdhesiveSelected] = useState(false);
  // const [isBindersSelected, setIsBindersSelected] = useState(false);
  // const [isMathSelected, setIsMathSelected] = useState(false);
  // const [isSelected, setIsSelected] = useState(false);
  // const [selectedChipIndex, setSelectedChipIndex] = useState(-1);
  const [selectedChip, setSelectedChip] = useState(-1);

  const [categories, setCategories] = useState([]);
  const [stationeryList, setStationeryList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState("");

  useEffect(() => {
    getAllStationery();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    console.log("selectedChip effected............");
    filterProducts(selectedChip);
  }, [selectedChip]);

  // useEffect(() => {
  //   if (isAllSelected) {
  //     setIsWritingSelected(false);
  //     setIsBookSelected(false);
  //     setIsArtSelected(false);
  //     setIsAdhesiveSelected(false);
  //     setIsBindersSelected(false);
  //     setIsMathSelected(false);
  //   }
  // }, [isAllSelected]);

  // useEffect(() => {
  //   if (
  //     !isAllSelected &&
  //     !isWritingSelected &&
  //     !isBookSelected &&
  //     !isArtSelected &&
  //     !isAdhesiveSelected &&
  //     !isBindersSelected &&
  //     !isMathSelected
  //   ) {
  //     setIsAllSelected(true);
  //   }
  // }, [
  //   isAllSelected,
  //   isWritingSelected,
  //   isBookSelected,
  //   isArtSelected,
  //   isAdhesiveSelected,
  //   isBindersSelected,
  //   isMathSelected,
  // ]);

  // A function to update the dynamic state based on the index

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  // -------------Services -------------
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

  const filterProducts = async () => {
    console.log("Get all related products");
    console.log(selectedChip);

    if (selectedChip == 0) {
      getAllStationery();
      return;
    }

    if (selectedChip > 0) {
      categories.map(async (category, index) => {
        if (selectedChip === category.categoryId) {
          console.log(category.categoryId);

          let res = await StationeryService.getAllProductsByCategoryId(
            category.categoryId
          );

          let productsByCategory = res.data.data;

          setStationeryList([]);
          productsByCategory.map((product, index) => {
            categories.map((category, index) => {
              if (category.categoryId === product.category_id) {
                setStationeryList((prev) => {
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
          console.log(stationeryList);
        }
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
          // justifyContent="space-between"
        >
          {/* ----------------Filter Buttons------------------------- */}
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
            {/* --------------- All chip & Sorting Dropdown-------------- */}
            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={6}
              xs={6}
              className={classes.container_1_0}
              display="flex"
              justifyContent="end"
            >
              {/* <MyCategoryChip
                label="All"
                css_selected={classes.chip_all_selected}
                css_deselected={classes.chip_all_deselected}
                isAllSelected={isAllSelected}
                onClick={(e) => {
                  console.log("changing all selected");
                  setIsAllSelected(!isAllSelected);
                }}
              /> */}
              <Autocomplete
                className={classes.sort_dropdown}
                disablePortal
                id="role"
                options={sortTypes}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Default" />
                )}
                size="small"
                disabledItemsFocusable
                // onChange={(e, v) => {
                //   setLoginFormData({
                //     ...loginFormData,
                //     userStatus: v,
                //   });
                //   // console.log(loginFormData.userStatus);
                // }}
              />
            </Grid>

            {/* --------------- Category Chips -------------- */}
            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={6}
              xs={6}
              className={classes.container_1_1}
              display="flex"
              justifyContent="space-between"
            >
              {/* -------Category Chips------------ */}

              <MyToggleButtonGroup
                data={categories}
                css_selected={classes.chip_selected}
                css_deselected={classes.chip_deselected}
                onClick={(e, v) => {
                  // console.log("in shop");
                  // console.log(--v);
                  setSelectedChip(v);
                }}
              />

              {/* <MyCategoryChip
                label="Writing Equipment"
                css_selected={classes.chip_selected}
                css_deselected={classes.chip_deselected}
                isSelected={isWritingSelected}
                onClick={(e) => {
                  setIsWritingSelected(!isWritingSelected);
                  setIsAllSelected(false);
                }}
              />

              <MyCategoryChip
                label="Paper & Book"
                css_selected={classes.chip_selected}
                css_deselected={classes.chip_deselected}
                isSelected={isBookSelected}
                onClick={(e) => {
                  setIsBookSelected(!isBookSelected);
                  setIsAllSelected(false);
                }}
              />

              <MyCategoryChip
                label="Art Supplies"
                css_selected={classes.chip_selected}
                css_deselected={classes.chip_deselected}
                isSelected={isArtSelected}
                onClick={(e) => {
                  setIsArtSelected(!isArtSelected);
                  setIsAllSelected(false);
                }}
              />

              <MyCategoryChip
                label="Adhesives & Fastners"
                css_selected={classes.chip_selected}
                css_deselected={classes.chip_deselected}
                isSelected={isAdhesiveSelected}
                onClick={(e) => {
                  setIsAdhesiveSelected(!isAdhesiveSelected);
                  setIsAllSelected(false);
                }}
              />

              <MyCategoryChip
                label="Folders & Binders"
                css_selected={classes.chip_selected}
                css_deselected={classes.chip_deselected}
                isSelected={isBindersSelected}
                onClick={(e) => {
                  setIsBindersSelected(!isBindersSelected);
                  setIsAllSelected(false);
                }}
              />

              <MyCategoryChip
                label="Math & Geometry"
                css_selected={classes.chip_selected}
                css_deselected={classes.chip_deselected}
                isSelected={isMathSelected}
                onClick={(e) => {
                  setIsMathSelected(!isMathSelected);
                  setIsAllSelected(false);
                }}
              /> */}
            </Grid>
          </Grid>

          {/* ----------------Product List------------------------- */}
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={6}
            xs={6}
            className={classes.container_2}
            display="flex"
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
              {stationeryList.map((product, index) => {
                return (
                  <>
                    <ProductCard
                      key={index}
                      product={product}
                      onClick={(e) => {
                        navigate("/product-details", {
                          state: { product: product },
                        });
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

export default withStyles(styleSheet)(Shop);
