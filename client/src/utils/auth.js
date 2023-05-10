import jwtDecode from 'jwt-decode'

export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    if (user){
        const decodedToken = jwtDecode(user);
        const expirationDate = decodedToken.exp;
         var current_time = Date.now() / 1000;
         if(expirationDate < current_time)
         {
             localStorage.removeItem("user");
         }
         const userData = decodedToken;
         return userData
      }
}

export const logout = () => {
    localStorage.removeItem("user")
}