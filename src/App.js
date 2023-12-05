import React from 'react'
import Todos from './pages/Todos';
import { Route, Routes } from "react-router-dom"
import './App.scss'
import Graph from './pages/Graph';
const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Todos />} />
      <Route path="/graph" element={<Graph />} />
    </Routes>
  )
}

export default App