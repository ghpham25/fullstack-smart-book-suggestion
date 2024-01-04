import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Home";
import RecommendBookList from './RecommendBookList';
import Header from './components/Header';

function App() {
  return (
    <>
    <Header/>
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/recommended" element={<RecommendBookList/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
