import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../helpers/localStorageUtils';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';


export const AscendioContext = createContext()

export const AscendioProvider= ({children}) => {
  const [user, setUser] = useState("");
  const [userCourse, setUserCourse] = useState([])
  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState(false);
 
  
  const tokenLocalStorage = getLocalStorage("token") 

  useEffect(() => {
    setToken(tokenLocalStorage)
    if(tokenLocalStorage){ 
      const {user_id,type} = jwtDecode(tokenLocalStorage).user;
      axios
        .get(`http://localhost:3000/users/oneuser/${user_id}`)
        .then((res)=>{
          setUser(res.data)
        })
        .catch((err)=>{console.log(err)})
    }
    
  }, [isLogged,token])

  return (
    <AscendioContext.Provider value={{
      user, 
      setUser,
      token,
      setToken, 
      isLogged, 
      setIsLogged,
      userCourse,
      setUserCourse
      
    }}>
    {children}
    </AscendioContext.Provider>
  )
}