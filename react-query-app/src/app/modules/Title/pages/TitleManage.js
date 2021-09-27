import React from "react";
import TitleSearch from "../components/TitleSearch";
import TitleTable from "../components/TitleTable";
import TitleAddEdit from "../components/TitleAddEdit";

function TitleManage() {
  return (
    <div>
      <TitleSearch></TitleSearch>
      <TitleTable></TitleTable>
      <TitleAddEdit></TitleAddEdit>
    </div>
  );
}

export default TitleManage;
