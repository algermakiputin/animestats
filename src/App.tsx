import React from 'react'; 
import './App.css';
import Header from './Components/header/Header';
import Footer from './Components/Footer/Footer';
import HomePage from './Components/Pages/Home/HomePage';
import AnimeDetailsPage from './Components/Pages/AnimeDetails/AnimeDetailsPage';  
import { BrowserRouter, Route, Routes } from "react-router-dom";

const PageNotFound = () => {

  return <div className='container' id="not-found">
    <h2>404 page not found</h2>
  </div>
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/anime/:id' element={<AnimeDetailsPage />}></Route>   
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
