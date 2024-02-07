export const textSensitive = (text, text2) => {
  return text
    .toUpperCase()
    .normalize("NFD") //unicode
    .replace(/[\u0300-\u036f]/g, "") //expresion regular
    .includes(
      text2
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );
};

export const ratesAverage = (rates) =>{
  let result = 0;
  rates.forEach(elem => {
    result += elem.course_rates
  });
    /* return result/rates.length */
     return (result/rates.length).toFixed(2)
   
}
