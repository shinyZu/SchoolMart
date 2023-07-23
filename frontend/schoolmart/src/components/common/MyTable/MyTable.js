import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function MyTable(props) {
  const [pageSize, setPageSize] = React.useState(5);

  const handlePageSizeChange = () => {
    setPageSize(props.pageSize);
  };

  return (
    <DataGrid
      rows={props.rows}
      columns={props.columns}
      // pageSize={props.pageSize}
      // pageSize={pageSize}
      rowsPerPageOptions={[props.rowsPerPageOptions]}
      checkboxSelection={props.checkboxSelection}
      onCellClick={props.handleCellClick}
      onRowClick={props.handleRowClick}
      stickyHeader={props.stickyHeader}
      // onPageSizeChange={handlePageSizeChange}
      // pageSizeOptions={props.pageSizeOptions}
      autoPageSize={true}
    />
  );
}

export default MyTable;
