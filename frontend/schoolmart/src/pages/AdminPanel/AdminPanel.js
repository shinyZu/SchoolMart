import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import RestoreIcon from "@mui/icons-material/Restore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AdminNavbar from "../../components/Navbar/AdminNavbar";
import MyTextField from "../../components/common/MyTextField/MyTextField";
import MyButton from "../../components/common/MyButton/MyButton";
import AdminTable from "../../components/common/TableSearchPage/TableSearch";
import MyTable from "../../components/common/MyTable/MyTable";
import Footer from "../../components/Footer/Footer";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import upload_bg from "../../assets/images/bg_login_1.jpg";

const categoryData = [
  {
    category_code: 1,
    category_name: "Writing",
  },
  {
    category_code: 2,
    category_name: "Books",
  },
  {
    category_code: 3,
    category_name: "Art Supplies",
  },
];

const productData = [
  {
    st_code: 1,
    st_name: "Product 1",
    description: "Lorem ipsum 1",
    image_name: "Pen",
    image_url: "",
    unit_price: "180.00",
    qty_on_hand: "20",
    category_id: "1",
  },
  {
    st_code: 1,
    st_name: "Product 1",
    description: "Lorem ipsum 1",
    image_name: "Pen",
    image_url: "",
    unit_price: "180.00",
    qty_on_hand: "20",
    category_id: "1",
  },
  {
    st_code: 1,
    st_name: "Product 1",
    description: "Lorem ipsum 1",
    image_name: "Pen",
    image_url: "",
    unit_price: "180.00",
    qty_on_hand: "20",
    category_id: "1",
  },
  {
    st_code: 1,
    st_name: "Product 1",
    description: "Lorem ipsum 1",
    image_name: "Pen",
    image_url: "",
    unit_price: "180.00",
    qty_on_hand: "20",
    category_id: "1",
  },
];

const categories = [
  "Writing Instruments",
  "Paper & Books",
  "Art Supplies",
  "Adhesives & Fastners",
  "Folders & Binders",
  "Math & Geometry",
];

const AdminPanel = (props) => {
  const { classes } = props;
  const [categoryCode, setCategoryCode] = useState("");
  const [categoryName, setCategoryName] = useState("");
  // const [productCode, setProductCode] = useState("");
  // const [productName, setProductName] = useState("");

  const [media, setMedia] = useState(upload_bg);

  const [newProductFormData, setNewProductFormData] = useState({
    st_code: "",
    st_name: "",
    description: "",
    image_name: "",
    image_url: "",
    unit_price: "",
    qty_on_hand: "",
    category_id: "",
  });

  // const [categoryData, setCategoryData] = useState([]);
  // const [productData, setProductData] = useState([]);

  const tbl_category_columns = [
    {
      field: "id",
      headerName: "Actions",
      renderCell: (cellValues) => {
        // console.log(cellValues);
        return (
          <>
            <Tooltip title="Edit">
              <IconButton>
                <EditIcon
                  // fontSize="large"
                  onClick={() => {
                    console.log("clicked row : " + cellValues.id);
                    console.log(categoryData[cellValues.id]);
                    // loadDataToFields(cellValues.id, categoryData[cellValues.id]);
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon
                  // fontSize="large"
                  onClick={() => {
                    console.log("clicked row : " + cellValues.id);
                    // deleteCar(categoryData[cellValues.id]);
                  }}
                />
              </IconButton>
            </Tooltip>
          </>
        );
      },
      width: 200,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
    {
      field: "category_id",
      headerName: "Category Code",
      width: 245,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "category_name",
      headerName: "Category Name",
      width: 240,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
  ];

  const tbl_product_columns = [
    {
      field: "id",
      headerName: "Actions",
      renderCell: (cellValues) => {
        // console.log(cellValues);
        return (
          <>
            <Tooltip title="Edit">
              <IconButton>
                <EditIcon
                  // fontSize="large"
                  onClick={() => {
                    console.log("clicked row : " + cellValues.id);
                    console.log(productData[cellValues.id]);
                    // loadDataToFields(cellValues.id, productData[cellValues.id]);
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon
                  // fontSize="large"
                  onClick={() => {
                    console.log("clicked row : " + cellValues.id);
                    // deleteCar(productData[cellValues.id]);
                  }}
                />
              </IconButton>
            </Tooltip>
          </>
        );
      },
      width: 180,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
    {
      field: "st_code",
      headerName: "Product Code",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "st_name",
      headerName: "Product Name",
      width: 220,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "description",
      headerName: "Description",
      width: 250,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "category_id",
      headerName: "Category",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "unit_price",
      headerName: "Unit Price",
      width: 180,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "qty_on_hand",
      headerName: "Qty On Hand",
      width: 160,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
  ];

  return (
    <div id="home">
      <AdminNavbar />

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
          {/* --------------------- Add Category Section ---------------------- */}
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.category_main_container}
            display="flex"
            justifyContent="space-between"
          >
            {/* --------------------- Category Fields & Button ---------------------- */}
            <Grid
              container
              rowGap={2}
              xl={4.9}
              lg={4.9}
              md={4.9}
              sm={12}
              xs={12}
              className={classes.category_main_container_left}
              display="flex"
              // justifyContent="space-between"
            >
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.category_title_container}
                display="flex"
                // justifyContent="space-between"
              >
                <Typography variant="h5" className={classes.category_title}>
                  Add New Category
                </Typography>
              </Grid>

              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.category_fields_container}
                display="flex"
                // justifyContent="space-between"
              >
                {/* -------- Row 1 ------------- */}
                <Grid
                  container
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.category_field_row}
                  display="flex"
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="category_id"
                    placeholder="Category Code"
                    value={categoryCode}
                    onChange={(e) => setCategoryCode(e.target.value)}
                    style={{ width: "100%", paddingTop: "5px" }}
                  />
                </Grid>
              </Grid>

              {/* -------- Row 2 ------------- */}
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.category_field_row}
                display="flex"
              >
                <MyTextField
                  variant="outlined"
                  type="text"
                  id="ct_name"
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  style={{ width: "100%", paddingTop: "5px" }}
                />
              </Grid>

              {/* ------- Add Category Button------- */}
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.btn_save_category_container}
                display="flex"
                // justifyContent="space-between"
              >
                <MyButton
                  label="Add Category"
                  size="small"
                  variant="outlined"
                  type="button"
                  className={classes.btn_save}
                  style={{ width: "100%", height: "90%" }}
                  onClick={(e) => {
                    console.log("Saved Category");
                  }}
                />
              </Grid>
            </Grid>

            {/* --------------------- Category Table---------------------- */}

            <Grid
              container
              xl={7}
              lg={7}
              md={7}
              sm={12}
              xs={12}
              className={classes.category_main_container_right}
              display="flex"
              justifyContent="end"
            >
              <AdminTable
                // page="CR"
                tableColumns={tbl_category_columns}
                tableData={categoryData.map((category, index) => ({
                  id: index,
                  category_code: category.category_code,
                  category_name: category.category_name,
                }))}
                // getRowId={(row) => row.reg_no}
                rowsPerPageOptions={5}
              />
            </Grid>
          </Grid>

          {/* --------------------- Add Stationery Section ---------------------- */}
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.product_main_container}
            display="flex"
            justifyContent="space-between"
          >
            {/* -------------- Add Product Fields Section --------- */}

            <Grid
              container
              rowGap={2}
              xl={4.9}
              lg={4.9}
              md={4.9}
              sm={12}
              xs={12}
              className={classes.product_main_container_left}
              display="flex"
              // justifyContent="space-between"
            >
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.product_title_container}
                display="flex"
                // justifyContent="space-between"
              >
                <Typography variant="h5" className={classes.product_title}>
                  Add New Stationery
                </Typography>
              </Grid>

              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.product_fields_container}
                display="flex"
                // justifyContent="center"
              >
                {/* -------- Row 1 ------------- */}
                <Grid
                  container
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.product_field_row}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Grid
                    item
                    xl={5.8}
                    lg={5.8}
                    md={5.8}
                    sm={12}
                    xs={12}
                    className={classes.product_field_row_left}
                  >
                    <MyTextField
                      variant="outlined"
                      type="text"
                      id="st_code"
                      placeholder="Product Code"
                      value={newProductFormData.st_code}
                      onChange={(e) => {
                        setNewProductFormData({
                          ...newProductFormData,
                          st_code: e.target.value,
                        });
                      }}
                      // onChange={(e) => setProductCode(e.target.value)}
                      style={{ width: "100%", paddingTop: "5px" }}
                    />
                  </Grid>

                  <Grid
                    item
                    xl={5.8}
                    lg={5.8}
                    md={5.8}
                    sm={12}
                    xs={12}
                    className={classes.product_field_row_right}
                  >
                    <MyTextField
                      variant="outlined"
                      type="text"
                      id="st_name"
                      placeholder="Product Name"
                      value={newProductFormData.st_name}
                      // onChange={(e) => setProductName(e.target.value)}
                      onChange={(e) => {
                        setNewProductFormData({
                          ...newProductFormData,
                          st_name: e.target.value,
                        });
                      }}
                      style={{ width: "100%", paddingTop: "5px" }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* -------- Row 2 ------------- */}
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.product_field_row}
                display="flex"
              >
                <MyTextField
                  variant="outlined"
                  type="text"
                  id="description"
                  placeholder="Product Description"
                  value={newProductFormData.description}
                  // onChange={(e) => setCategoryName(e.target.value)}
                  onChange={(e) => {
                    setNewProductFormData({
                      ...newProductFormData,
                      description: e.target.value,
                    });
                  }}
                  style={{ width: "100%", paddingTop: "5px" }}
                />
              </Grid>

              {/* -------- Row 3 ------------- */}
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.product_field_row}
                display="flex"
              >
                <Autocomplete
                  // className={classes.category_dropdown}
                  disablePortal
                  id="role"
                  options={categories}
                  sx={{ width: 600 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      styles={{ color: "red" }}
                    />
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

              {/* -------- Row 4 ------------- */}
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.product_field_row}
                display="flex"
                justifyContent="space-between"
              >
                <Grid
                  item
                  xl={5.8}
                  lg={5.8}
                  md={5.8}
                  sm={12}
                  xs={12}
                  className={classes.product_field_row_left}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="u_price"
                    placeholder="Unit Price"
                    value={newProductFormData.unit_price}
                    onChange={(e) => {
                      setNewProductFormData({
                        ...newProductFormData,
                        unit_price: e.target.value,
                      });
                    }}
                    // onChange={(e) => setProductCode(e.target.value)}
                    style={{ width: "100%", paddingTop: "5px" }}
                  />
                </Grid>

                <Grid
                  item
                  xl={5.8}
                  lg={5.8}
                  md={5.8}
                  sm={12}
                  xs={12}
                  className={classes.product_field_row_right}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="qty"
                    placeholder="Quantity On Hand"
                    value={newProductFormData.qty_on_hand}
                    // onChange={(e) => setProductName(e.target.value)}
                    onChange={(e) => {
                      setNewProductFormData({
                        ...newProductFormData,
                        qty_on_hand: e.target.value,
                      });
                    }}
                    style={{ width: "100%", paddingTop: "5px" }}
                  />
                </Grid>
              </Grid>

              {/* ------- Add Stationery Button------- */}
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.btn_save_product_container}
                display="flex"
                alignItems="end"
              >
                <MyButton
                  label="Add Product"
                  size="small"
                  variant="outlined"
                  type="button"
                  className={classes.btn_save}
                  style={{ width: "100%", height: "90%" }}
                  onClick={(e) => {
                    console.log("Saved Product");
                  }}
                />
              </Grid>
            </Grid>

            {/* ----------- Image Upload Section ---------- */}

            <Grid
              container
              // rowGap={2}
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className={classes.product_main_container_right}
              // display="flex"
            >
              <Grid
                container
                // item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                mt={2}
                className={classes.image_upload_container}
                style={{ backgroundImage: `url${media}` }}
              >
                <img
                  src={media}
                  // alt={categoryName}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Grid>

              <Grid
                // container
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                mt={2}
                className={classes.btn_save_product_container}
              >
                {/* ---------- Upload Image button -------------- */}

                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.btn_save_image_container}
                  display="flex"
                  // justifyContent="space-between"
                >
                  <MyButton
                    label="Upload Image"
                    size="small"
                    variant="outlined"
                    type="button"
                    className={classes.btn_save}
                    style={{ width: "100%", height: "90%" }}
                    onClick={(e) => {
                      console.log("Image Uploaded");
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* --------------------- Product Table---------------------- */}

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.tbl_product_container}
            display="flex"
            // justifyContent="end"
          >
            <AdminTable
              // page="CR"
              tableColumns={tbl_product_columns}
              tableData={productData.map((product, index) => ({
                id: index,
                st_code: product.st_code,
                st_name: product.st_name,
                description: product.description,
                image_name: product.image_name,
                image_url: product.image_url,
                unit_price: product.unit_price,
                qty_on_hand: product.qty_on_hand,
                category_id: product.category_id,
              }))}
              // getRowId={(row) => row.reg_no}
              rowsPerPageOptions={5}
            />
          </Grid>
        </Grid>
      </Box>
      {/* ------------- Footer -------------- */}
      <Footer />
    </div>
  );
};

export default withStyles(styleSheet)(AdminPanel);
