import React from "react";
import { Grid } from "@material-ui/core";
import ParentChart from "../components/chartDrillDown/ParentChart";
import ChildChart from "../components/chartDrillDown/ChildChart";

function ChartDrillDownDemo() {
  const [selectedParentDetail, setSelectedParentDetail] = React.useState({
    dataPintIndex: -1,
      dataPointName: '',
      seriesIndex: -1,
      seriesName: ''
  })

  const selectedParentChanged = (selectedParentDetail) => {
    setSelectedParentDetail(selectedParentDetail)
  }

  return (
    <Grid container>
      <Grid item lg={6}>
        <ParentChart selectedChanged={selectedParentChanged.bind(this)}></ParentChart>
      </Grid>
      <Grid item lg={6}>
        <ChildChart selectedParentDetail={selectedParentDetail}></ChildChart>
      </Grid>
    </Grid>
  );
}

export default ChartDrillDownDemo;
