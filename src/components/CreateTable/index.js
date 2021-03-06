import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ExportToExcel from "../ExportToExcel";

const CreateTable = ({ colNo }) => {
  const [columns, setColumns] = useState(["Column 1"]);
  const [generating, setGenerating] = useState(true);
  const [readOnly, setReadOnly] = useState(true);
  const [rows, setRows] = useState(0);
  const [rowsData, setRowsData] = useState([]);
  const [modified, setModified] = useState(false);

  const handleChange = (e, index, index2) => {
    const fields = rowsData[index].map((r, j) => (j === index2 ? e : r));
    setRowsData(rowsData.map((rw, i) => (i === index ? fields : rw)));
  };

  const addRow = () => {
    setModified(true);
    setRows((prevRows) => prevRows + 1);
    let array = [""];
    for (let i = 1; i < columns.length; i++) {
      array.push("");
    }
    setRowsData((prevRowsData) => [...prevRowsData, array]);
  };

  const deleteRow = (index) => {
    setModified(true);
    setRows((prevRows) => prevRows - 1);
    setRowsData((prevRowsData) => prevRowsData.filter((row, i) => i !== index));
  };

  const addColumn = () => {
    setModified(true);
    if (columns.length === 10) {
      return toast.dark("You can add max. 10 columns!");
    }
    setColumns((prevColumns) => [
      ...prevColumns,
      `Column ${columns.length + 1}`,
    ]);

    setRowsData((prevRowsData) =>
      prevRowsData.map((row) => row.push("") && row)
    );
  };
  const deleteColumn = (index) => {
    setModified(true);
    if (columns.length === 1) {
      return toast.dark("There Should be atleast 1 column!");
    }
    setColumns((prevColumns) =>
      prevColumns.filter((col) => prevColumns.indexOf(col) !== index)
    );

    setRowsData((prevRowsData) =>
      prevRowsData.map((row) => {
        const filteredRows = row.filter((rw, i) => i !== index);
        return filteredRows;
      })
    );
  };

  const exportToJson = () => {
    const data = [];

    rowsData.map((row, index) => {
      const obj = { sno: index + 1 };
      columns.map((col, i) => {
        obj[col] = row[i];
      });
      data.push(obj);
    });

    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `data.json`;
    link.href = url;
    link.click();
  };

  useEffect(() => {
    if (columns.length < colNo && !modified) {
      for (let i = 1; i < colNo; i++) {
        setColumns([...columns, `Column ${i + 1}`]);
      }
    }
    setGenerating(false);
  }, []);

  return (
    <Container fluid>
      <Row className="mt-5 mb-3">
        <Col md={3}>
          <h5 className="text-center">Create Table</h5>
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-end"
          style={{ marginLeft: "auto", marginRight: "70px" }}
        >
          <span className="mr-2">Columns: {columns.length} </span> &nbsp;&nbsp;
          <span className="mr-2">Rows: {rows} </span>&nbsp;&nbsp;
          <Button type="button" onClick={addRow} variant="outline-dark">
            Add Row
          </Button>
          &nbsp;&nbsp;
          <Button type="button" onClick={addColumn} variant="outline-dark">
            Add Column
          </Button>
          &nbsp;&nbsp;
          <Button type="button" onClick={exportToJson} variant="success">
            Save as JSON
          </Button>
          &nbsp;&nbsp;
          <ExportToExcel columns={columns} rowsData={rowsData} />
        </Col>
      </Row>
      <Row>
        <Col md={12} className="px-5">
          {!generating ? (
            <>
              <Table responsive className="my-5 h-100">
                <thead>
                  <tr>
                    <th></th>
                    {columns.map((col, index) => (
                      <th key={index + 999999}>
                        <Button
                          type="button"
                          className="btn-block w-100"
                          onClick={() => deleteColumn(index)}
                          variant="outline-danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </th>
                    ))}
                    <th></th>
                  </tr>
                  <tr className="bg-dark text-white">
                    <th
                      scope="col"
                      className="d-flex align-items-center justify-content-center py-3 pb-2 border-0"
                    >
                      Sno.
                    </th>
                    {columns.map((col, index) => (
                      <th key={index} scope="col">
                        <input
                          type="text"
                          className="form-control border-0 text-center bg-dark text-white"
                          style={{ outline: "none", boxShadow: "none" }}
                          readOnly={readOnly}
                          onFocus={() => setReadOnly(false)}
                          onBlur={() => setReadOnly(true)}
                          value={columns[index]}
                          onChange={(e) =>
                            setColumns(
                              columns.map((coln, id) =>
                                id === index ? e.target.value : coln
                              )
                            )
                          }
                        />
                      </th>
                    ))}
                    <th className="text-center">
                      <Button
                        type="button"
                        onClick={addColumn}
                        variant="outline-light"
                        size="sm"
                      >
                        Add Column
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rowsData.length > 0 ? (
                    <>
                      {rowsData.map((data, index) => (
                        <tr key={index + 5}>
                          <td className="text-center">{index + 1}</td>
                          {data.map((row, index2) => (
                            <td key={index2 + 988}>
                              <input
                                type="text"
                                className="form-control text-center"
                                placeholder={`Enter field`}
                                value={rowsData[index][index2]}
                                onChange={(e) =>
                                  handleChange(e.target.value, index, index2)
                                }
                              />
                            </td>
                          ))}
                          <td className="text-center">
                            <Button
                              type="button"
                              onClick={() => deleteRow(index)}
                              variant={"outline-danger"}
                              size="sm"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <th colSpan={columns.length + 2} className="pt-5">
                          <Button
                            type="button"
                            onClick={addRow}
                            className="w-100"
                            variant="outline-dark"
                          >
                            Add Row
                          </Button>
                        </th>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <th
                          className="text-center py-3"
                          colSpan={columns.length + 2}
                        >
                          Please click on Add Row Button to add a row
                        </th>
                      </tr>
                      <tr>
                        <th colSpan={columns.length + 2}>
                          <Button
                            type="button"
                            onClick={addRow}
                            className="w-100"
                            variant="outline-dark"
                          >
                            Add Row
                          </Button>
                        </th>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </>
          ) : (
            <h1 className="text-center my-5">Generating...</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTable;
