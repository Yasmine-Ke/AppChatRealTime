import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import UserList from './user/Getuser';
import CreateUser from './Createuser';
import SignInUser from './user/Signin';
import UpdatePasswordForm from './user/updatepassword';
import ChatComponent from './socket';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<UserList/>} />
          <Route path="/Create" element={<CreateUser/>} />
          <Route path="/Connecter" element={<SignInUser/>} />
          <Route path="/Reset" element={<UpdatePasswordForm/>} />
          <Route path="/Socket" element={<ChatComponent/>} />
          {/* Assurez-vous d'avoir les routes pour les composants PaymentForm et Patient ici */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
