import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import UserList from './Getuser';
import CreateUser from './Createuser';
import SignInUser from './Signin';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<UserList/>} />
          <Route path="/Create" element={<CreateUser/>} />
          <Route path="/Connecter" element={<SignInUser/>} />
          {/* Assurez-vous d'avoir les routes pour les composants PaymentForm et Patient ici */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
