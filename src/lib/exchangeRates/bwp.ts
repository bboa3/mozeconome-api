
const bwpRates = (text: string) => {

  const buy = text.split('\n')[55];
  
  const sale = text.split('\n')[128];

  const medium = text.split('\n')[152];


  return {
    buy,
    sale,
    medium
  }

}

export default bwpRates;
