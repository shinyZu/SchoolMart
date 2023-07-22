import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import Header from "../../components/Header/Header";
import MyCategoryChip from "../../components/common/MyCategoryChip/MyCategoryChip";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import StationeryService from "../../services/StationeryService";

const sortTypes = ["Default", "Acending", "Descending"];
const categories = [
  "Writing Instruments",
  "Paper & Books",
  "Art Supplies",
  "Adhesives & Fastners",
  "Folders & Binders",
  "Math & Geometry",
];

const products = [
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
  {
    img: "",
    category: "Category 1",
    productName: "Product 1",
    price: "00.00",
  },
];

const Shop = (props) => {
  const { classes } = props;
  const navigate = useNavigate();

  const [isAllSelected, setIsAllSelected] = useState(true);
  const [isWritingSelected, setIsWritingSelected] = useState(false);
  const [isBookSelected, setIsBookSelected] = useState(false);
  const [isArtSelected, setIsArtSelected] = useState(false);
  const [isAdhesiveSelected, setIsAdhesiveSelected] = useState(false);
  const [isBindersSelected, setIsBindersSelected] = useState(false);
  const [isMathSelected, setIsMathSelected] = useState(false);

  const [stationeryList, setStationeryList] = useState([]);

  useEffect(() => {
    console.log("--------------1-------------");
    getAllStationery();
  }, []);

  useEffect(() => {
    if (isAllSelected) {
      setIsWritingSelected(false);
      setIsBookSelected(false);
      setIsArtSelected(false);
      setIsAdhesiveSelected(false);
      setIsBindersSelected(false);
      setIsMathSelected(false);
    }
  }, [isAllSelected]);

  useEffect(() => {
    if (
      !isAllSelected &&
      !isWritingSelected &&
      !isBookSelected &&
      !isArtSelected &&
      !isAdhesiveSelected &&
      !isBindersSelected &&
      !isMathSelected
    ) {
      setIsAllSelected(true);
    }
  }, [
    isAllSelected,
    isWritingSelected,
    isBookSelected,
    isArtSelected,
    isAdhesiveSelected,
    isBindersSelected,
    isMathSelected,
  ]);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  // -------------Services -------------
  const getAllStationery = async () => {
    let res = await StationeryService.getAll();

    if (res.status == 200) {
      console.log(res.data);
      setStationeryList(res.data);
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
              justifyContent="space-between"
            >
              <MyCategoryChip
                label="All"
                css_selected={classes.chip_all_selected}
                css_deselected={classes.chip_all_deselected}
                isSelected={isAllSelected}
                onClick={(e) => {
                  console.log("writing selected");
                  setIsAllSelected(!isAllSelected);
                }}
              />
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
              <MyCategoryChip
                label="Writing Equipment"
                css_selected={classes.chip_selected}
                css_deselected={classes.chip_deselected}
                isSelected={isWritingSelected}
                onClick={(e) => {
                  setIsWritingSelected(!isWritingSelected);
                  // if (isWritingSelected) {
                  //   setIsAllSelected(isWritingSelected);
                  // } else {
                  //   setIsAllSelected(!isAllSelected);
                  // }
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
              />
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
              {products.map((product, index) => {
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

export default withStyles(styleSheet)(Shop);
