/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import * as demoAxios from "../_redux/demoAxios";
import StandardDataTable from "../../_common/components/DataTable/StandardDataTable";
import SearchBox from "../components/datatableDemo/SearchBox";
import ColumnDateTime from "../../_common/components/DataTable/ColumnDateTime";
import ColumnNumber from "../../_common/components/DataTable/ColumnNumber";
import ColumnIsActive from "../../_common/components/DataTable/ColumnIsActive";
import EditButton from "../../_common/components/Buttons/EditButton";
import * as swal from '../../_common/components/SweetAlert'
import ViewButton from "../../_common/components/Buttons/ViewButton";
import DeleteButton from "../../_common/components/Buttons/DeleteButton";

var flatten = require("flat");

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

function DatatableListDemo(props) {
  const classes = useStyles();

  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
    searchValues: {
      searchProductGroupName: "",
    },
  });

  const [totalRecords, setTotalRecords] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false)

  //load Data
  const loadData = () => {
    setLoading(true)
    demoAxios
      .getProductGroupFilter(
        paginated.orderingField,
        paginated.ascendingOrder,
        paginated.page,
        paginated.recordsPerPage,
        paginated.searchValues.searchProductGroupName,
      )
      .then((res) => {
        if (res.data.isSuccess) {
          let flatData = [];
          res.data.data.forEach((element) => {
            flatData.push(flatten(element));
          });
          setData(flatData);
          setTotalRecords(res.data.totalAmountRecords);
        } else {
          swal.swalError('error',res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError('Error',err.message)
      })
      .finally(() => {
        setLoading(false)
      });
  };

  const handleUpdateSearch = (values) => {
    setPaginated({
      ...paginated,
      searchValues: {
        searchProductGroupName: values.productGroupName,
      },
    });
  };

  // column
  const columns = [
    {
      name: "id",
      label: "รหัสรายการ",
    },
    {
      name: "name",
      label: "รายการ",
      option: {
        sort: false,
      },
    },
    {
      name: "isActive",
      label: "สถานะ",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnIsActive value={data[dataIndex].isActive} activeText="ใช้งาน" inActiveText="ไม่ใช้งาน"></ColumnIsActive>
          );
        },
      },
    },
    {
      name: "วันที่สร้าง",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnDateTime
              value={data[dataIndex].createdDate}
            ></ColumnDateTime>
          );
        },
      },
    },

    {
      name: "จำนวน",
      options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <ColumnNumber
              value={1000}
              thousandSeparator
              isNumericString
            ></ColumnNumber>
          );
        },
      },
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
              <Grid item xs={12} lg={4}>
              <ViewButton
                onClick={() => {
                  handleButtonClick('view',data[dataIndex].id);
                }}
              >
                View
              </ViewButton>
              </Grid>
              <Grid item xs={12} lg={4}>
              <EditButton
                onClick={() => {
                  handleButtonClick('edit',data[dataIndex].id);
                }}
              >
                Edit
              </EditButton>
              </Grid>
              <Grid item xs={12} lg={4}>
              <DeleteButton
                onClick={() => {
                  handleButtonClick('delete',data[dataIndex].id);
                }}
              >
                Delete
              </DeleteButton>
              </Grid>
            </Grid>
          );
        },
      },
    },
  ];

  const handleButtonClick = (action,id) => {
    swal.swalInfo('clicked info',action + ' ' + id);
  };

  React.useEffect(() => {
    loadData();
  }, [paginated]);

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <SearchBox updateSearch={handleUpdateSearch.bind(this)} loading={loading}></SearchBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <StandardDataTable
              name="testTable"
              title="Test"
              columns={columns}
              data={data}
              paginated={paginated}
              setPaginated={setPaginated}
              totalRecords={totalRecords}
            ></StandardDataTable>
          </Grid>
        </Grid>
      </Paper>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        style={{ marginLeft: 10, marginTop: 10 }}
      >
        <Link
          href="https://github.com/gregnb/mui-datatables"
          color="textSecondary"
          target="_blank"
          rel="noopener"
        >
          Datatable By MUI Datatable
        </Link>
      </Grid>
    </div>
  );
}

export default DatatableListDemo;
