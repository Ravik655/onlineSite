import React, { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartIteam = localStorage.getItem("cart");
    if (existingCartIteam) setCart(JSON.parse(existingCartIteam));
  }, []);

  return (
    <cartContext.Provider value={[cart, setCart]}>
      {children}
    </cartContext.Provider>
  );
};

const useCart = () => useContext(cartContext);

export { useCart };
