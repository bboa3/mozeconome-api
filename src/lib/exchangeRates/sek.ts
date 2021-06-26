
const sekRates = (text: string) => {

  const buy = text.split('\n')[70];
  
  const sale = text.split('\n')[143];

  const medium = text.split('\n')[167];


  return {
    buy,
    sale,
    medium
  }

}

export default sekRates;
