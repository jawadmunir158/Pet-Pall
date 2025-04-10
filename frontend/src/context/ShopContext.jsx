import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs";
  const delivery_fee = 250;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  // Fetch products from the backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data && response.data.data) {
        setProducts(response.data.data);
        localStorage.setItem("products", JSON.stringify(response.data.data)); // Save products locally
      } else {
        throw new Error("Invalid API response.");
      }
    } catch (error) {
      setError("Failed to fetch products. Please try again later.");
    }
  }

  useEffect(() => {
    getProductsData()
  }, []);

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get' , {} , {headers:{token}})
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  }, [])
  const addToCart = async (itemId) => {
    let cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  
  // Function to update item quantity in cart
  const updateQuantity = async (itemId, quantity) => {

    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData)
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token } })
      } catch (error) {
        console.log(error)
        toast.error(error.message)

      }
    }

  }
  // Get total number of items in cart
  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        totalCount += cartItems[itemId]; // ✅ Correctly accessing the quantity
      }
    }

    return totalCount;
  };

  // Get total amount in cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo && quantity > 0) {
        totalAmount += itemInfo.price * quantity;
      }
    }
    return totalAmount;
  };
  
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems, // ✅ Use "cart" instead of "cartItems"
    setCartItems, // ✅ Ensure this is included
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    backendUrl,
  }
  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
