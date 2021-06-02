import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const CreateTable = ({ colNo }) => {
  const [columns, setColumns] = useState(["Column 1"]);
  const [generating, setGenerating] = useState(true);
  const [readOnly, setReadOnly] = useState(true);
  const [rows, setRows] = useState(1);
  const [rowsData, setRowsData] = useState([[]]);

  const handleChange = (e, index, index2) => {
    const fields = rowsData[index].map((r, j) => (j === index2 ? e : r));
    setRowsData(rowsData.map((rw, i) => (i === index ? fields : rw)));
  };

  const addRow = () => {
    setRows((prevRows) => prevRows + 1);
    let array = [""];
    for (let i = 1; i < colNo; i++) {
      array.push("");
    }
    setRowsData((prevRowsData) => [...prevRowsData, array]);
  };

  const deleteRow = (index) => {
    setRows((prevRows) => prevRows - 1);
    setRowsData((prevRowsData) => prevRowsData.filter((row, i) => i !== index));
  };

  const addColumn = () => {
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

  useEffect(() => {
    if (columns.length < colNo) {
      let array = [""];
      for (let i = 1; i < colNo; i++) {
        setColumns([...columns, `Column ${i + 1}`]);
        array.push("");
      }
      setRowsData([array]);
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
        </Col>
      </Row>
      <Row>
        <Col md={12} className="px-5">
          {!generating ? (
            <>
              <Table responsive className="mt-5">
                <tbody>
                  <tr>
                    <th>#</th>
                    {columns.map((col, index) => (
                      <th key={index + 999999}>
                        <Button
                          type="button"
                          className="btn-block w-100"
                          onClick={() => deleteColumn(index)}
                          variant="outline-danger"
                        >
                          Delete
                        </Button>
                      </th>
                    ))}
                    <th></th>
                    <th></th>
                  </tr>
                </tbody>
              </Table>
              <Table responsive className="mt-2 h-100">
                <thead className="bg-dark text-white">
                  <tr>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
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
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
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
