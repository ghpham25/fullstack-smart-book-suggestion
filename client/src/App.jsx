import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Home";
import RecommendBookList from './RecommendBookList';
import Readlist from './Readlist';
import Header from './components/Header';


function App() {
  return (
    <>
    <Router>
    <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/recommended" element={<RecommendBookList/>} />
        <Route path = "/readlist" element = {<Readlist/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
