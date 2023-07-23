import React, { useEffect, useState } from "react";
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

import CategoryService from "../../services/CategoryService";
import StationeryService from "../../services/StationeryService";

import upload_bg from "../../assets/images/bg_login_1.jpg";

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
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU3VuIEp1bCAyMyAyMDIzIDEwOjM3OjAwIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MiwidXNlcm5hbWUiOiJqb2huQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDg1cGV6ckFlZXoudDIxVFkxNnpTR3VXb3lPbmJvd2RUbnlRZG5RamdpTmt3SThXM1hsREZXIiwidXNlcl9yb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTAwODg4MjAsImV4cCI6MTY5MDA5MDYyMH0.w6TSvCEUPo0_ryDE-ScMzAXYtazHgNisB_MRqGun9j4"
  );

  const [categoryCode, setCategoryCode] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productCode, setProductCode] = useState(0);
  // const [nextProductId, setNextProductId] = useState(0);

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

  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  const [categoryDropDown, setCategoryDropDown] = useState([]);

  const [btnProps, setBtnProps] = useState({
    btnLabel: "Add Product",
    // btnColor: "#1abc9c",
  });

  const [isClearClicked, setIsClearClicked] = useState(false);

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
      width: 248,
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
                    loadProductDataToFields(
                      cellValues.id,
                      productData[cellValues.id]
                    );
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

  useEffect(() => {
    console.log("useEffect []");
    getAllCategories();
    getAllProducts();
    getNextProductId();
  }, []);

  const getAllCategories = async () => {
    console.log("Get all categories");
    let res = await CategoryService.getAll();

    if (res.status == 200) {
      if (res.data.data != []) {
        console.log(res.data.data);
        setCategoryData(() => {
          return [...res.data.data];
        });

        setCategoryDropDown([]);
        res.data.data.map((category, index) => {
          setCategoryDropDown((prev) => {
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
    console.log(categoryDropDown);
  };

  const getNextProductId = async () => {
    console.log("--------2------------");
    console.log("Get next stationery id");
    let res = await StationeryService.getNextId();

    if (res.status === 200) {
      console.log("next product id: " + res.data.data.next_id);
      console.log("--------3------------");
      setProductCode(res.data.data.next_id);
    }
  };

  const getAllProducts = async () => {
    console.log("Get all stationery");
    let res = await StationeryService.getAll();

    if (res.data.status == 200) {
      if (res.data.data != []) {
        console.log(res.data.data);
        setProductData(() => {
          return [...res.data.data];
        });

        // getNextProductId();
      }
    }
  };

  const saveProduct = async () => {
    console.log("Saving stationery");

    if (newProductFormData.image_url === "") {
      console.log("Save without image");

      let res = await StationeryService.saveProduct(newProductFormData);
      console.log(res);

      if (res.status == 201) {
        console.log("Product is saved");
        getAllProducts();
        clearProductForm();
      } else {
        console.log(res.response.data.message);
      }
    } else {
      console.log("Save WITH image");
    }
  };

  const loadProductDataToFields = async (rowId, product) => {
    console.log(product);
    setBtnProps({ btnLabel: "Edit Product" });

    setNewProductFormData({
      st_code: product.st_code,
      st_name: product.st_name,
      description: product.description,
      // image_name: product.image_name,
      // image_url: product.image_url,
      unit_price: product.unit_price,
      qty_on_hand: product.qty_on_hand,
      category_id: product.category_id,
    });

    setProductCode(product.st_code);

    // Find the category name with the category id
    const ctg = categoryDropDown.find(
      (category) => category.categoryId === product.category_id
    );
    setCategoryName(ctg.categoryTitle);
  };

  const clearProductForm = () => {
    console.log("--------1------------");
    getNextProductId();

    setNewProductFormData({
      st_code: "",
      st_name: "",
      description: "",
      image_name: "",
      image_url: "",
      unit_price: "",
      qty_on_hand: "",
      category_id: "",
    });
    setCategoryName("");
    setBtnProps({ btnLabel: "Add Product" });
  };

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
                  category_id: category.category_id,
                  category_name: category.category,
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
                      // value={newProductFormData.st_code}
                      value={productCode}
                      disabled
                      onChange={(e) => {
                        setNewProductFormData({
                          ...newProductFormData,
                          st_code: productCode,
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
                          st_code: productCode,
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
                  options={categoryDropDown}
                  getOptionLabel={(option) => option.categoryTitle}
                  inputValue={categoryName}
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
                  onChange={(e, v) => {
                    setCategoryName(v.categoryTitle);
                    setNewProductFormData({
                      ...newProductFormData,
                      category_id: v.categoryId,
                    });
                  }}
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
                    placeholder="Unit Price (Rs)"
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
                container
                // columnGap={2}
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.btn_save_product_container}
                display="flex"
                justifyContent="space-between"
              >
                <MyButton
                  label={btnProps.btnLabel}
                  size="small"
                  variant="outlined"
                  type="button"
                  className={classes.btn_save}
                  style={{ width: "48%", height: "90%" }}
                  onClick={(e) => {
                    console.log("Saved Product");
                    saveProduct();
                  }}
                />

                <MyButton
                  label="Clear Form"
                  size="small"
                  variant="outlined"
                  type="button"
                  className={classes.btn_clear}
                  style={{ width: "48%", height: "90%" }}
                  onClick={(e) => {
                    console.log("Clearing product form");
                    clearProductForm();
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
