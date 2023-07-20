import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const About = (props) => {
  const { classes } = props;
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
          className={classes.main_img_container}
          display="flex"
          justifyContent="space-between"
        >
          <Grid
            item
            xl={5.8}
            lg={5.8}
            md={5.8}
            sm={5.8}
            xs={5.8}
            className={classes.img_container_left}
          ></Grid>

          <Grid
            container
            rowGap={2}
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className={classes.img_container_right}
            display="flex"
          >
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.img_container_right_1}
            ></Grid>
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.img_container_right_2}
            ></Grid>
          </Grid>
        </Grid>

        {/* ----------------------------Text---------------------- */}

        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={6}
          xs={6}
          className={classes.main_container_text}
          display="flex"
          justifyContent="space-between"
        >
          <Grid
            item
            xl={5.8}
            lg={5.8}
            md={5.8}
            sm={6}
            xs={6}
            className={classes.main_container_text_left}
          >
            <Typography variant="h3" className={classes.txt_title}>
              What We Do
            </Typography>
            <p className={classes.para_1}>
              Lorem ipsum dolor sit amet et delectus accommodare his consul
              copiosae legendos at vix ad putent delectus delicata usu. Vidit
              dissentiet eos cu eum an brute copiosae hendrerit. Eos erant
              dolorum an. Per facer affert ut. Mei iisque mentitum moderatius
              cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te
              facilisis mnesarchum qui posse omnium mediocritatem est cu. Modus
              argumentum ne qui tation efficiendi in eos. Ei mea falli legere
              efficiantur et tollit aliquip debitis mei. Vidit dissentiet eos cu
              eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer
              affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis
              accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum
              qui posse omnium mediocritatem est cu. Modus argumentum ne qui
              tation efficiendi in eos.
            </p>
          </Grid>

          <Grid
            container
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className={classes.main_container_text_right}
          >
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={6}
              xs={6}
              className={classes.main_container_text_right_1}
            >
              <Typography variant="h3" className={classes.txt_title}>
                Mission
              </Typography>
              <p className={classes.para_1}>
                Lorem ipsum dolor sit amet et delectus accommodare his consul
                copiosae legendos at vix ad putent delectus delicata usu. Vidit
                dissentiet eos cu eum an brute copiosae hendrerit. Eos erant
                dolorum an. Per facer affert ut. Mei iisque mentitum moderatius
                cu.
              </p>
            </Grid>

            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={6}
              xs={6}
              className={classes.main_container_text_right_2}
            >
              <Typography variant="h3" className={classes.txt_title}>
                Vision
              </Typography>
              <p className={classes.para_1}>
                Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos
                erant dolorum an. Per facer affert ut. Mei iisque mentitum
                moderatius cu. Sit munere facilis accusam eu dicat falli
                consulatu at vis. Te facilisis mnesarchum qui posse omnium
                mediocritatem est cu. Modus argumentum ne qui tation efficiendi
                in eos.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* ------------- Footer -------------- */}
      <Footer />
    </div>
  );
};

export default withStyles(styleSheet)(About);
