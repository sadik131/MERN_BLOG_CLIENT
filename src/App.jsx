import React from 'react'
import Home from './Pages/Home'
import { Routes, Route } from "react-router-dom"
import Nav from './components/nav/Nav'
import Login from './Pages/Login'
import Signin from './Pages/Signin'
import Profile from './Pages/Profile'
import PrivetRoute from './hook/privetRoute'

function App() {

  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route element={<PrivetRoute />} >
          <Route path='/profile' element={<Profile />}></Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
      </Routes>

    </>
  )
}

export default App
