import React from 'react'
import Navigation from '../Pages/Navigation'
import Footer from '../Pages/Footer'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
      <Navigation/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout
