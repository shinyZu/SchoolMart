import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const ProductCard = (props) => {
  const { classes } = props;
  // const { category, st_name, unit_price, image_url } = props.product;
  const data = props.data;
  console.log(data);

  return (
    <>
      <Grid
        container
        xl={props.cardWidth}
        lg={2.5}
        md={2.5}
        sm={6}
        xs={12}
        className={classes.card}
        onClick={props.onClick}
        key={props.index}
      >
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={
            props.page !== "history"
              ? { backgroundImage: `url(${data.image_url})` }
              : { backgroundImage: `url(${data.details[0].image_url})` }
          }
          className={classes.card_img}
        ></Grid>
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={
            props.page == "history"
              ? classes.history_card_description
              : classes.card_description
          }
          display="flex"
          flexDirection="column"
        >
          {props.page == "history" ? (
            <>
              <Typography variant="h7" className={classes.txt_order_details}>
                Order: {data.order._id}
              </Typography>
              <Typography variant="h7" className={classes.txt_order_details}>
                Date: {data.order.order_date.split("T")[0]}
              </Typography>
              {/* <Typography variant="h7" className={classes.txt_prod_price}>
                Total: {data.order.order_cost}
              </Typography> */}
            </>
          ) : (
            <>
              <Typography variant="h8" className={classes.txt_prod_ctg}>
                {data.category}
              </Typography>
              <Typography variant="h7" className={classes.txt_prod_name}>
                {data.st_name}
              </Typography>
              <Typography variant="h7" className={classes.txt_prod_price}>
                LKR {data.unit_price}.00
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styleSheet)(ProductCard);
