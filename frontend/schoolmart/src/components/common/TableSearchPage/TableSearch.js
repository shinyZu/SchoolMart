import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import MyTable from "../MyTable/MyTable";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

function TableSearch(props) {
  const { classes } = props;
  return (
    <Grid
      container
      //   xl={props.page == "B" ? 10.3 : props.page == "C" ? 6.7 : 7.53}
      //   lg={props.page == "B" ? 10 : props.page == "C" ? 8.94 : 10}
      xl={11}
      lg={12}
      md={10}
      sm={10}
      xs={10}
      className={classes.table__container}
    >
      <Box
        sx={{
          // height: 300,
          width: "100%",
          boxShadow: 1,
          // border: 2,

          "& .header_color": {
            backgroundColor: "#C88EA7",
            color: "white",
          },
        }}
      >
        <MyTable
          rows={props.tableData}
          columns={props.tableColumns}
          pageSize={5}
          rowsPerPageOptions={[props.rowsPerPageOptions]}
          // pageSizeOptions={[4, 8, 12]}
          // autoPageSize={true}
          // rowsPerPageOptions={[3, 6, 9]}

          // checkboxSelection
        />
      </Box>
    </Grid>
  );
}

export default withStyles(styleSheet)(TableSearch);
