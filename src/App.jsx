import React from 'react';
import Home from './pages/Home';
import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cardinfo from './pages/Cardinfo';
import Favorities from './pages/Favorities';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <div>
         <Navbar/>

      </div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/movies/:id' element={<Cardinfo/>}></Route>
        <Route path='/favorites' element={<Favorities/>}></Route>

      </Routes>
       
      
      </BrowserRouter>
    
      
    </div>
  );
};

export default App;