import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Home = ({ setColNo }) => {
  const [cols, setCols] = useState(0);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cols) {
      return toast.dark("Please enter no of columns! you can edit them later!");
    }
    setColNo(cols);
    history.push("/createTable");
  };
  return (
    <Container>
      <Row>
        <h1 className="text-center my-5">
          React Js <span className="text-primary">Dynamic Table</span>
        </h1>
        <h5 className="mb-3 text-center">Enter no. of columns</h5>
        <Col md={6} className="mx-auto mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicNumber">
              <Form.Control
                value={cols}
                onChange={(e) => setCols(e.target.value)}
                type="number"
                name="colsNo"
              />
            </Form.Group>
            <Form.Group controlId="formBasicBtn" className="my-5">
              <Button
                type="submit"
                variant="dark"
                bg="dark"
                className="form-control"
              >
                Proceed
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
