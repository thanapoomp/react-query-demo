import React from "react";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { Typography, CircularProgress } from "@material-ui/core";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

function StandardDataTable(props) {
  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    filter: false,
    search: false,
    selectableRows: props.selectableRows,
    serverSide: true,
    selectableRowsOnClick: props.cursorPointer,
    count: props.totalRecords,
    customToolbarSelect: () => {},
    rowsSelected: props.selectedRows ? props.selectedRows : [],
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      props.rowsSelectedIndex({
        rowsSelected: rowsSelected,
        allRows: allRows,
        rowsSelectedData: rowsSelectedData,
      });
    },

    page: props.paginated.page - 1,
    rowsPerPage: props.paginated.recordsPerPage,
    rowsPerPageOptions: [5, 10, 15, 20, 30, 50],
    responsive: "vertical",
    rowHover: true,
    onChangeRowsPerPage: (numberOfRows) => {
      props.setPaginated({ ...props.paginated, recordsPerPage: numberOfRows });
    },
    onChangePage: (currentPage) => {
      props.setPaginated({ ...props.paginated, page: currentPage + 1 });
    },
    onColumnSortChange: (changedColumn, direction) => {
      props.setPaginated({
        ...props.paginated,
        orderingField: `${changedColumn}`,
        ascendingOrder: direction === "asc" ? true : false,
      });
    },
    textLabels: {
      body: {
        noMatch: "ไม่พบข้อมูล",
        toolTip: "Sort",
        columnHeaderTooltip: (column) => `จัดเรียงจาก ${column.label}`,
      },
      pagination: {
        next: "ถัดไป",
        previous: "ย้อนกลับ",
        rowsPerPage: "ข้อมูลต่อหน้า",
        displayRows: "จาก",
      },
      viewColumns: {
        title: "แสดง Columns",
        titleAria: "Show/Hide Table Columns",
      },
    },
    setTableProps: () => {
      return {
        // material ui v4 only
        size: props.denseTable ? "small" : "medium",
      };
    },
  };

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MuiTableCell: {
          head: {
            backgroundColor: props.headerbgcolor,
            fontFamily: props.fontFamily,
          },
          root: {
            fontFamily: props.fontFamily,
          },
        },
      },
    });

  return (
    <div>
      {/* Datatable */}
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          denseTable={props.denseTable}
          title={
            <React.Fragment>
              <Typography variant="h6" align="left">
                {props.title}
              </Typography>
              {props.loading && <CircularProgress></CircularProgress>}
            </React.Fragment>
          }
          data={props.data}
          columns={props.columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}

StandardDataTable.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  paginated: PropTypes.object,
  setPaginated: PropTypes.func,
  rowsSelectedIndex: PropTypes.func,
  data: PropTypes.array,
  columns: PropTypes.array,
  totalRecords: PropTypes.number,
  denseTable: PropTypes.bool,
  cursorPointer: PropTypes.bool,
  loading: PropTypes.bool,
  selectableRows: PropTypes.string,
  selectedRows: PropTypes.array,
};

// Same approach for defaultProps too
StandardDataTable.defaultProps = {
  name: "please set name",
  title: "please set title",
  paginated: {
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  },
  setPaginated: () => {},
  data: [],
  columns: [],
  totalRecords: 0,
  denseTable: true,
  selectableRows: "none",
  selectedRows: [],
  selectableRowsHeader: false,
  fontFamily: "Sarabun",
  cursorPointer: false,
  loading: false,
};

export default StandardDataTable;
