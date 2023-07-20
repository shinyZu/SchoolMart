import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import PlaceIcon from "@mui/icons-material/Place";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const ContactCard = (props) => {
  const { classes } = props;
  return (
    <>
      <Grid
        container
        xl={3.8}
        lg={3.8}
        md={3.8}
        sm={6}
        xs={6}
        className={classes.contact_container}
        // display="flex"
        // justifyContent="row"
      >
        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={6}
          xs={6}
          className={classes.contact_card_container}
        >
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={6}
            xs={6}
            className={classes.icon_container}
            display="flex"
            justifyContent="center"
          >
            {props.icon}
          </Grid>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={6}
            xs={6}
            className={classes.info_container}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h8" className={classes.contact_info}>
              {props.detail_1}
            </Typography>

            <Typography variant="h8" className={classes.contact_info}>
              {props.detail_2}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styleSheet)(ContactCard);
