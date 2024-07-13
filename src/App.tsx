import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import DeletedTask from "./components/TaskManagment/components/DeletedTask";
import TaskManagment from "./components/TaskManagment/container";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskManagment />} />
        <Route path="/trash" element={<DeletedTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
