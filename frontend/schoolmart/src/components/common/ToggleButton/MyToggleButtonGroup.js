import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const MyToggleButtonGroup = (props) => {
  const [alignment, setAlignment] = useState(0);
  const categories = props.data;

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      fullWidth
      color="primary"
      size="small"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton
        value={0}
        onClick={(e, n) => {
          props.onClick(e, n);
        }}
      >
        All
      </ToggleButton>
      {categories.map((category, index) => {
        return (
          <ToggleButton
            key={index}
            value={++index}
            onClick={(e, n) => {
              props.onClick(e, n);
            }}
          >
            {category.categoryTitle}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

export default withStyles(styleSheet)(MyToggleButtonGroup);
