import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function MyTable(props) {
  return (
    <DataGrid
      rows={props.rows}
      columns={props.columns}
      pageSize={props.pageSize}
      rowsPerPageOptions={[props.rowsPerPageOptions]}
      checkboxSelection={props.checkboxSelection}
      onCellClick={props.handleCellClick}
      onRowClick={props.handleRowClick}
      stickyHeader={props.stickyHeader}
    />
  );
}

export default MyTable;
