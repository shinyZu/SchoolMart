import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const MyCategoryChip = (props) => {
  const { classes } = props;
  return (
    <>
      {props.isSelected ? (
        <Chip
          label={props.label}
          className={props.css_selected}
          onClick={props.onClick}
        />
      ) : (
        <Chip
          label={props.label}
          variant="outlined"
          className={props.css_deselected}
          onClick={props.onClick}
        />
      )}
    </>
  );
};

export default withStyles(styleSheet)(MyCategoryChip);
