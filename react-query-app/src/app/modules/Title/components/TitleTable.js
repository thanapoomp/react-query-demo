/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import StandardDataTable from "../../_common/components/DataTable/StandardDataTable";
import ColumnDateTime from "../../_common/components/DataTable/ColumnDateTime";
import ColumnIsActive from "../../_common/components/DataTable/ColumnIsActive";
import EditButton from "../../_common/components/Buttons/EditButton";
import * as swal from "../../_common/components/SweetAlert";
import DeleteButton from "../../_common/components/Buttons/DeleteButton";
import * as titleRedux from "../redux/titleRedux";

require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    height: "auto",
  },
}));

function TitleTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const titleReducer = useSelector(({ title }) => title);
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "Name",
    ascendingOrder: true,
  });

  // column
  const columns = [
    {
      name: "id",
      label: "รหัสรายการ",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              spacing={1}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <React.Fragment>
                <Grid item xs={12} lg={4}>
                  <EditButton onClick={() => {}}>Edit</EditButton>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <DeleteButton onClick={() => {}}>Delete</DeleteButton>
                </Grid>
              </React.Fragment>
            </Grid>
          );
        },
      },
    },
  ];

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <StandardDataTable
            name="Title"
            denseTable
            title="Manage Title"
            loading={false}
            columns={columns}
            data={[]}
            paginated={paginated}
            setPaginated={setPaginated}
            totalRecords={0}
          ></StandardDataTable>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TitleTable;
