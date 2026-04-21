import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/login';
import JoinUs from './Pages/joinus';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/joinus' element={<JoinUs />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit-profile' element={<EditProfile />} />
      </Routes>
    </>
  )
}

export default App;