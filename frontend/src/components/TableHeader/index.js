import React from "react";
import List from "../styled/List";

const TableHeader = ({ data = [] }) => {
  return (
    <List header data-testid="table-header">
      {data.map((item, key) => (
        <td key={key}>{item}</td>
      ))}
    </List>
  );
};

export default TableHeader;
