import React from "react";

import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ExportToExcel = ({ columns, rowsData }) => {
  return (
    <>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="table"
        sheet="table"
        buttonText="Export Excel"
        className="btn btn-success"
      />
      <table id="table-to-xls" style={{ display: "none" }}>
        <tr>
          <th>s no</th>
          {columns.map((col, id) => (
            <th key={id * 5}>{col}</th>
          ))}
        </tr>
        {rowsData.map((row, id) => (
          <tr key={id * 99}>
            <td key={55}>{id + 1}</td>
            {row.map((rw, i) => (
              <td key={i * 88}>{rw}</td>
            ))}
          </tr>
        ))}
      </table>
    </>
  );
};

export default ExportToExcel;
