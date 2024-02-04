 import { useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Account from './Pages/Account';

function App() {

  return (
    <div>
      <BrowserRouter>
        
        <Routes>
          <Route index path='/*' element={<Home/>}/>
          <Route path='/account/*' element={<Account/>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
  
}

export default App;

