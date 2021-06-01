import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

const CreateTable = ({ colNo }) => {
  const [columns, setColumns] = useState(["Column 1"]);
  const [generating, setGenerating] = useState(true);
  const [readOnly, setReadOnly] = useState(true);
  const [rows, setRows] = useState(1);
  const [rowsData, setRowsData] = useState([[]]);

  const handleChange = (e, index, index2) => {
    const fields = rowsData[index].map((r, j) => (j == index2 ? e : r));
    setRowsData(rowsData.map((rw, i) => (i === index ? fields : rw)));
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
      <Row>
        <Col md={12} className="px-5">
          {!generating ? (
            <Table responsive className="mt-5">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="d-flex align-items-center justify-content-center py-3 pb-2 border-0">
                    Sno.
                  </th>
                  {columns.map((col, index) => (
                    <th key={index}>
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
                </tr>
              </thead>
              <tbody>
                {rowsData.map((data, index) => (
                  <tr key={index + 5}>
                    <td>{index + 1}</td>
                    {data.map((row, index2) => (
                      <td key={index2 + 988}>
                        <input
                          type="text"
                          placeholder={`Enter field`}
                          value={rowsData[index][index2]}
                          onChange={(e) =>
                            handleChange(e.target.value, index, index2)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h1 className="text-center my-5">Generating...</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTable;
