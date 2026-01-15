import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterSection from './components/Footer/FooterSection'
import Navigation from './components/Navigation/Navigation'
import PriceTracker from './components/PriceTracker/PriceTracker'

const Layout = () => {
  return (
    <>
    <PriceTracker />
    <Navigation/>
    <Outlet/>
    <FooterSection/>
    </>
  )
}

export default Layout