import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyProducts } from '../assets/assets.js'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY

  const [user, setUser] = useState(null)
  const [isSeller, setIsSeller] = useState(false)
  const [showUserLogin, setShowUserLogin] = useState(false)
  const [products, setProducts] = useState([])

  const [cartItems, setCartItems] = useState({})

  const [searchQuery, setSearchQuery] = useState('')

  // fetch Seller Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get('/api/seller/is-auth')
      if (data.success) {
        setIsSeller(true)
      } else {
        setIsSeller(false)
      }
    } catch (error) {
      setIsSeller(false)
    }
  }
  // fetch user suth status,user data and cartitems
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/is-auth')
      if (data.success) {
        setUser(data.user)
        setCartItems(data.user.cartItems)
      }
    } catch (error) {
      setUser(null)
    }
  }

  //ftech all product
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/list')
      if (data.success) {
        setProducts(data.products)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  //add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      cartData[itemId] += 1
    } else {
      cartData[itemId] = 1
    }
    setCartItems(cartData)
    toast.success('added to cart')
  }
  //   updateCartitem
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId] = quantity
    setCartItems(cartData)
    toast.success('Cart updated')
  }
  //   remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      cartData[itemId] -= 1
      if (cartData[itemId] === 0) {
        delete cartData[itemId]
      }
    }

    toast.success('Removed from cart')
    setCartItems(cartData)
  }
  // get cart item Count
  const getCartCount = () => {
    let totalCount = 0
    for (const item in cartItems) {
      totalCount += cartItems[item]
    }
    return totalCount
  }

  //get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id === item)
      if (cartItems[item] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[item]
      }
    }
    return Math.floor(totalAmount * 100) / 100
  }
  useEffect(() => {
    fetchUser()
    fetchProducts()
    fetchSeller()
  }, [])
  // update cartItems in db
  const updateCart = async () => {
    try {
      const { data } = await axios.post('/api/cart/update', { cartItems })
      if (!data.success) {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (user) {
      updateCart()
    }
  }, [cartItems])
  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}
