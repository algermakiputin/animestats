import React from 'react'; 
import './App.css';
import Header from './Components/header/Header';
import HomePage from './Components/Pages/Home/HomePage';
import AnimeDetailsPage from './Components/Pages/AnimeDetails/AnimeDetailsPage'; 
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/anime/:id' element={<AnimeDetailsPage />} />  
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
