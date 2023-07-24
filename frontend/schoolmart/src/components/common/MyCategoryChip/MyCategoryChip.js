import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const MyCategoryChip = (props) => {
  const { classes } = props;
  const [isClicked, setIsClicked] = useState(false);
  const [isAllClicked, setIsAllClicked] = useState(true);
  // const [isAllClicked, setIsAllClicked] = useState(props.isAllClicked);
  // console.log(props.isAllSelected);

  return (
    <>
      {/* {props.isSelected ? (
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
      )} */}

      {/* ------------------- */}

      {/* {props.label == "All" ? (
        <Chip
          label={props.label}
          variant="outlined"
          className={isAllClicked ? props.css_selected : props.css_deselected}
          // skipFocusWhenDisabled={isClicked ? true : false}
          // onClick={props.onClick}
          // onClick={() => {
          //   setIsClicked(!isClicked);
          // }}
          onClick={() => {
            // console.log("isAllClicked: " + isAllClicked);
            // console.log("isClicked: " + isClicked);
            setIsAllClicked(!isAllClicked);
            // setIsClicked(false);
            // props.onClick();
          }}
        />
      ) : (
        <Chip
          label={props.label}
          variant="outlined"
          // skipFocusWhenDisabled={!isAllClicked ? true : false}
          className={isClicked ? props.css_selected : props.css_deselected}
          // className={!isAllClicked ? props.css_selected : props.css_deselected}
          // onClick={props.onClick}
          onClick={() => {
            // console.log("isAllClicked: " + isAllClicked);
            // console.log("isClicked: " + isClicked);
            setIsClicked(!isClicked);
            // setIsAllClicked(false);
            // props.onClick();
            // if (!isClicked) {
            // setIsAllClicked(false);
            // }
          }}
        />
      )} */}

      {/* ------------------- */}

      <Chip
        label={props.label}
        variant="outlined"
        className={
          props.label === "All" && isAllClicked
            ? props.css_selected
            : props.label !== "All" && isClicked
            ? props.css_selected
            : props.css_deselected
        }
        // className={
        //   props.label !== "All" && isClicked && !isAllClicked
        //     ? props.css_selected
        //     : props.css_deselected
        // }
        onClick={() => {
          setIsAllClicked(!isAllClicked);
          setIsClicked(!isClicked);

          // if (isClicked && isAllClicked) {
          //   setIsAllClicked(false);
          // } else if (!isAllClicked) {
          //   setIsClicked(!isClicked);
          // }
        }}
      />
    </>
  );
};

export default withStyles(styleSheet)(MyCategoryChip);
