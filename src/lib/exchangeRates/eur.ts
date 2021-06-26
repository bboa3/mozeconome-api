
const eurRates = (text: string) => {

  const buy = text.split('\n')[61];
  
  const sale = text.split('\n')[134];

  const medium = text.split('\n')[158];


  return {
    buy,
    sale,
    medium
  }

}

export default eurRates;
