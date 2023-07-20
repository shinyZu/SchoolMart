import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import PlaceIcon from "@mui/icons-material/Place";

import Header from "../../components/Header/Header";
import ContactCard from "../../components/common/ContactCard/ContactCard";
import Footer from "../../components/Footer/Footer";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const Conatct = (props) => {
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
          className={classes.main_container}
          display="flex"
          justifyContent="space-between"
        >
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={6}
            xs={6}
            className={classes.main_title_container}
            display="flex"
            justifyContent="center"
          >
            <Typography variant="h3" className={classes.main_title}>
              Get In Touch
            </Typography>
          </Grid>
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={6}
            xs={6}
            className={classes.main_title_container}
            display="flex"
            justifyContent="center"
          >
            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={6}
              xs={6}
              className={classes.contact_container}
              display="flex"
              justifyContent="space-between"
            >
              {/* ----------Contact Card----------- */}
              <ContactCard
                icon={<LocalPhoneIcon className={classes.icon_img} />}
                detail_1={"+ 123 456 789 0"}
                detail_2={"+ 123 456 789 0"}
              />
              <ContactCard
                icon={<MarkunreadIcon className={classes.icon_img} />}
                detail_1="info@example.com"
                detail_2="info@support.com"
              />
              <ContactCard
                icon={<PlaceIcon className={classes.icon_img} />}
                detail_1="1569 Ave, New York, NY 10028, USA"
                detail_2="Sri Lanka"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* ------------- Footer -------------- */}
      <Footer />
    </div>
  );
};

export default withStyles(styleSheet)(Conatct);
