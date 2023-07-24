import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const QtyChanger = (props) => {
  const { classes } = props;
  console.log(props);
  const [qty, setQty] = useState(props.qty);

  return (
    <>
      <Grid
        container
        xl={3}
        lg={3}
        md={3}
        sm={12}
        xs={12}
        className={classes.container_right_1_0}
      >
        <Grid
          item
          xl={4}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          className={classes.container_minus}
          display="flex"
          justifyContent="center"
          onClick={(e) => {
            console.log("qty -");
            let q = qty - 1;
            if (q > 0) {
              setQty(q);
            }
            // console.log({ qty });
            props.onDecrease(q);
          }}
        >
          <Typography variant="h8" className={classes.txt_minus_plus}>
            -
          </Typography>
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          className={classes.container_qty}
          display="flex"
          justifyContent="center"
        >
          <Typography variant="h8" className={classes.txt_qty}>
            {qty}
          </Typography>
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          className={classes.container_plus}
          display="flex"
          justifyContent="center"
          onClick={(e, v) => {
            console.log("qty +");
            let q = qty + 1;
            setQty(q);
            // console.log(qty);
            props.onIncrease(q);
          }}
        >
          <Typography variant="h8" className={classes.txt_minus_plus}>
            +
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

// export default MyButton;
export default withStyles(styleSheet)(QtyChanger);
