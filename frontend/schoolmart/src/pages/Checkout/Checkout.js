import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

import Header from "../../components/Header/Header";
import MyTextField from "../../components/common/MyTextField/MyTextField";
import MyButton from "../../components/common/MyButton/MyButton";
import SummaryItem from "../../components/common/SummaryItem/SummaryItem";
import CartTotals from "../../components/common/CartTotals/CartTotals";
import Footer from "../../components/Footer/Footer";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

// import img_item_1 from "../../assets/images/Home/Category/ct_pens.jpg";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const img_item_1 =
  "https://drive.google.com/uc?id=195Fima7KXJJuN0X0vf2fCIU6gSQwEvsK";

const orderSummaryItems = [
  {
    img_url: "https://drive.google.com/uc?id=1udcfVrDsgSqJEZnTGhjHxH3NDyd17EAe",
    productName: "Product 01",
    price: 180,
    qty: 1,
    subtotal: 180,
  },

  {
    img_url: "https://drive.google.com/uc?id=1pE7g9RUBB27Gu9l46bnFBkwvaKBhP_D9",
    productName: "Product 02",
    price: 100,
    qty: 3,
    subtotal: 300,
  },

  {
    img_url: "https://drive.google.com/uc?id=195Fima7KXJJuN0X0vf2fCIU6gSQwEvsK",
    productName: "Product 03",
    price: 500,
    qty: 3,
    subtotal: 1500,
  },
];

const Checkout = (props) => {
  const { classes } = props;
  //   const { state } = useLocation();
  const location = useLocation();
  const receivedData = location.state; // The data sent from the previous page

  //   Billing Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  //   Payment Info
  const [paymentType, setPaymntType] = useState("card");
  const [cardNo, setCardNo] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardExpireDate, setCardExpireDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [checked, setChecked] = useState(false);

  //   Order Summary
  const [finalSubtotal, setFinalSubTotal] = useState(0);

  useEffect(() => {
    let final_subtotal = 0;
    for (let item of orderSummaryItems) {
      final_subtotal += item.subtotal;
      console.log(final_subtotal);
      setFinalSubTotal(final_subtotal);
    }
  }, [finalSubtotal]);

  const handlePaymentType = (event) => {
    setPaymntType(event.target.value);
  };

  const handleCheckBox = (event) => {
    console.log(checked);
    setChecked(event.target.checked);
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
              Checkout
            </Typography>
          </Grid>

          {/* ----------Billing & Payment Info--------------------- */}

          <Grid
            container
            rowGap={3}
            xl={5.8}
            lg={5.8}
            md={5.8}
            sm={12}
            xs={12}
            className={classes.details_container}
            display="flex"
            // justifyContent="center"
          >
            {/* ------------------ Billing Info ----------------------- */}

            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.billing_info_container}
              display="flex"
              // justifyContent="center"
            >
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.biiling_info_title_container}
                display="flex"
              >
                <Typography variant="h5" className={classes.biiling_info_title}>
                  Billing Details
                </Typography>
              </Grid>
              {/* -------- Row 1 ------------- */}
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.billing_info_row}
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
                  className={classes.billing_info_row_left}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="f_name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                  className={classes.billing_info_row_right}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="l_name"
                    placeholder="Last Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                className={classes.billing_info_row}
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
                  className={classes.billing_info_row_left}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="country"
                    placeholder="Country / Region"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
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
                  className={classes.billing_info_row_right}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="province"
                    placeholder="State / Province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    style={{ width: "100%", paddingTop: "5px" }}
                  />
                </Grid>
              </Grid>

              {/* -------- Row 3 ------------- */}
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.billing_info_row}
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
                  className={classes.billing_info_row_left}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="address"
                    placeholder="Street Address"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    style={{ width: "100%", paddingTop: "5px" }}
                  />
                </Grid>
              </Grid>

              {/* -------- Row 4 ------------- */}
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.billing_info_row}
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
                  className={classes.billing_info_row_left}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="city"
                    placeholder="Town / City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                  className={classes.billing_info_row_right}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="postal"
                    placeholder="Postal / ZIP Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    style={{ width: "100%", paddingTop: "5px" }}
                  />
                </Grid>
              </Grid>

              {/* -------- Row 5 ------------- */}
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.billing_info_row}
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
                  className={classes.billing_info_row_left}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                  className={classes.billing_info_row_right}
                >
                  <MyTextField
                    variant="outlined"
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", paddingTop: "5px" }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* ----------- Payment Info ---------------------- */}

            <Grid
              container
              rowGap={2}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.payment_info_container}
              display="flex"
              // justifyContent="center"
            >
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.payment_info_title_container}
                display="flex"
              >
                <Typography variant="h5" className={classes.payment_info_title}>
                  Payment Details
                </Typography>
              </Grid>

              {/* -------------------- Radio buttons --------------------- */}

              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.payment_type_select_container}
                display="flex"
                justifyContent="space-between"
              >
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={paymentType}
                    onChange={handlePaymentType}
                  >
                    <FormControlLabel
                      value="card"
                      control={
                        <Radio
                          sx={{
                            color: pink[800],
                            "&.Mui-checked": {
                              color: pink[600],
                            },
                          }}
                        />
                      }
                      label="Card"
                    />
                    <FormControlLabel
                      value="cash"
                      control={
                        <Radio
                          sx={{
                            color: pink[800],
                            "&.Mui-checked": {
                              color: pink[600],
                            },
                          }}
                        />
                      }
                      label="Cash On Delivery"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* --------------Payment Text Fields ------------- */}

              <Grid
                container
                rowGap={2}
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.payment_info_fields_container}
                display="flex"
                justifyContent="space-between"
              >
                {/* -------- Row 1 ------------- */}
                <Grid
                  container
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.payment_info_row}
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
                    className={classes.payment_info_row}
                  >
                    <MyTextField
                      variant="outlined"
                      type="text"
                      id="card_no"
                      placeholder="Card Number"
                      value={cardNo}
                      onChange={(e) => setCardNo(e.target.value)}
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
                  className={classes.payment_info_row}
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
                    className={classes.payment_info_row}
                  >
                    <MyTextField
                      variant="outlined"
                      type="text"
                      id="card_holder"
                      placeholder="Card Holder Name"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      style={{ width: "100%", paddingTop: "5px" }}
                    />
                  </Grid>
                </Grid>

                {/* -------- Row 3 ------------- */}
                <Grid
                  container
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.payment_info_row}
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
                    className={classes.payment_info_row_left}
                  >
                    <MyTextField
                      variant="outlined"
                      type="text"
                      id="expireDate"
                      placeholder="Expires MM/YY"
                      value={cardExpireDate}
                      onChange={(e) => setCardExpireDate(e.target.value)}
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
                    className={classes.payment_info_row_right}
                  >
                    <MyTextField
                      variant="outlined"
                      type="text"
                      id="cvv"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCVV(e.target.value)}
                      style={{ width: "100%", paddingTop: "5px" }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* ----------------Save & Confirm Payment Info -------------- */}

              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.save_payment_info_container}
                display="flex"
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheckBox}
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label="Save card details."
                  />
                </FormGroup>
              </Grid>

              {/* ---------- Save Card Detail button -------------- */}

              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={classes.sbtn_save_card_info_container}
                display="flex"
              >
                <MyButton
                  label="Save Card Details"
                  size="small"
                  variant="outlined"
                  type="button"
                  className={classes.btn_save_card}
                  style={{ width: "100%", height: "90%" }}
                  onClick={(e) => {
                    console.log("Saved Card Details");
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* -----------------Order Summary------------------ */}

          <Grid
            container
            xl={5.8}
            lg={5.8}
            md={5.8}
            sm={12}
            xs={12}
            className={classes.summary_container}
            display="flex"
          >
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.summary_title_container}
              display="flex"
              //   justifyContent="center"
            >
              <Typography variant="h5" className={classes.order_summary_title}>
                Order Summary
              </Typography>
            </Grid>

            {/* ---------------------Summary Table ---------------- */}

            {/* -------- Table Headers------------- */}

            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.tbl_summary_headers_container}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="h6" className={classes.tbl_headers}>
                Product
              </Typography>

              <Typography variant="h6" className={classes.tbl_headers}>
                Subtotal
              </Typography>
            </Grid>

            {/*--------------------- Item Summary ------------------------ */}
            {orderSummaryItems.map((item, index) => {
              return <SummaryItem key={index} item={item} />;
            })}

            {/* ----------- Order Totals ----------- */}
            <CartTotals
              subtotal={finalSubtotal}
              coupon={receivedData.coupon}
              shipping={0.0}
              discount={0.0}
            />

            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.place_order_btn_container}
            >
              {/* <Link to="/cart/checkout"> */}
              <MyButton
                label="PLACE ORDER"
                size="large"
                variant="outlined"
                type="button"
                className={classes.btn_place_order}
                style={{ width: "100%", height: "90%" }}
                onClick={(e) => {
                  console.log("Order Placed");
                }}
              />
              {/* </Link> */}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* ------------- Footer -------------- */}
      <Footer />
    </div>
  );
};

// export default MyButton;
export default withStyles(styleSheet)(Checkout);
