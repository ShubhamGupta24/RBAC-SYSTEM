import React from 'react';
import { Header } from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './Components/Home';
import { Login } from "./Components/login";
import { Register } from "./Components/Register";
import { Logout } from './Components/logout';




function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/Register' element={<Register />} />
          <Route exact path='/Logout' element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}


export default App;
