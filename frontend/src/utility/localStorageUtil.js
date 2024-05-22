export const saveCartToLocalStorage = (cart) => {
    try {
      const serializedCart = JSON.stringify(cart);
      localStorage.setItem('cart', serializedCart);
    } catch (error) {
      console.error('Could not save cart to local storage:', error);
    }
  };
  
  export const loadCartFromLocalStorage = () => {
    try {
      const serializedCart = localStorage.getItem('cart');
      if (serializedCart === null) {
        return undefined;
      }
      return JSON.parse(serializedCart);
    } catch (error) {
      console.error('Could not load cart from local storage:', error);
      return undefined;
    }
  };
  

  