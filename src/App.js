import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";

import CreateTable from "./components/CreateTable";
import Home from "./components/Home";

const App = () => {
  const [colNo, setColNo] = useState(0);
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={() => <Home setColNo={setColNo} />} />
        {colNo > 0 && (
          <Route
            path="/createTable"
            component={() => <CreateTable colNo={colNo} />}
          />
        )}
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
