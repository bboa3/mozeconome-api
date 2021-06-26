
const kwdRates = (text: string) => {

  const buy = text.split('\n')[65];
  
  const sale = text.split('\n')[138];

  const medium = text.split('\n')[162];


  return {
    buy,
    sale,
    medium
  }

}

export default kwdRates;
