
const gbpRates = (text: string) => {

  const buy = text.split('\n')[63];
  
  const sale = text.split('\n')[136];

  const medium = text.split('\n')[160];


  return {
    buy,
    sale,
    medium
  }

}

export default gbpRates;
