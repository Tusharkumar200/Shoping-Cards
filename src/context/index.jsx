// create ther context
// provide the state to context
// wrap conxtext in root component
// consume the context in child component using useContext hook

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const shoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchListOfProducts() {
    try {
      const apiResponse = await fetch("https://dummyjson.com/products");
      const result = await apiResponse.json();

      if (result && result.products) {
        setListOfProducts(result.products);
        setLoading(false);
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddToCart(getProductDetails) {

    console.log(getProductDetails);
    let cpyExistingCartItems = [...cartItems];
    const findIndexOfCartItem = cpyExistingCartItems.findIndex(cartItem=> cartItem.id === getProductDetails.id);

    if(findIndexOfCartItem === -1){
      cpyExistingCartItems.push({
        ...getProductDetails, 
        quantity: 1,
        totalPrice: getProductDetails?.price,
      });
    }else{
      console.log("its coming here...");
      cpyExistingCartItems[findIndexOfCartItem] ={
        ...cpyExistingCartItems[findIndexOfCartItem],
        quantity: cpyExistingCartItems[findIndexOfCartItem].quantity +1,
        totalPrice: (cpyExistingCartItems[findIndexOfCartItem].quantity +1) * cpyExistingCartItems[findIndexOfCartItem].price
      }
      
    }
    console.log(cpyExistingCartItems , "cpyExistingCartItems");
    setCartItems(cpyExistingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    navigate('/cart')
    
  }

  function handleRemoveFromCart(getProductDetails,isFullyRemoveFromCart){
    let cpyExistingCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = cpyExistingCartItems.findIndex(item=> item.id === getProductDetails.id);

    if(isFullyRemoveFromCart){
      cpyExistingCartItems.splice(findIndexOfCurrentCartItem , 1)
    }
    else{
      cpyExistingCartItems[findIndexOfCurrentCartItem] = {
        ...cpyExistingCartItems[findIndexOfCurrentCartItem],
        quantity:cpyExistingCartItems[findIndexOfCurrentCartItem].quantity -1,
        totalPrice: (cpyExistingCartItems[findIndexOfCurrentCartItem].quantity -1) * cpyExistingCartItems[findIndexOfCurrentCartItem].price
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    setCartItems(cpyExistingCartItems)
  }
  useEffect(() => {
    fetchListOfProducts();
    setCartItems(JSON.parse(localStorage.getItem('cartItems') || []))
  }, []);

  console.log(cartItems);

  return (
    <shoppingCartContext.Provider
      value={{
        listOfProducts,
        loading,
        setLoading,
        productDetails,
        setProductDetails,
        handleAddToCart,
        cartItems,
        handleRemoveFromCart,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
