 export const getLocalStorage = (item) => {
   return localStorage.getItem(item)
 } 

 export const saveLocalStorage = (item, data) => {
   localStorage.setItem(item, data)
   return true; // por no dejarla sin retorno, pero se puede quitar
 }

 export const delLocalStorage = (item) => {
   localStorage.removeItem(item)
  return true; 
 }