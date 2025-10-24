import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/appContext'
import Login from './components/Login'
import AllProduct from './pages/AllProduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'

const App = () => {
  const { showUserLogin } = useAppContext()
  const isSellerPath = useLocation().pathname.includes('seller')
  return (
    <div className="">
      {!isSellerPath ? <Navbar /> : null}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetail />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
        </Routes>
      </div>
      {!isSellerPath ? <Footer /> : null}
    </div>
  )
}

export default App
