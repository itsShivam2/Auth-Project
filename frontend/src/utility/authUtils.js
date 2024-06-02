export const saveAuthState = (state) => {
    localStorage.setItem("auth", JSON.stringify(state));
  };
  
  export const loadAuthState = () => {
    const storedState = localStorage.getItem("auth");
    return storedState ? JSON.parse(storedState) : null;
  };
  
  export const clearAuthState = () => {
    localStorage.removeItem("auth");
  };
  