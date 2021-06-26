
const usdRates = (text: string) => {

  const buy = text.split('\n')[49];
  
  const sale = text.split('\n')[122];

  const medium = text.split('\n')[146];

  return {
    buy,
    sale,
    medium
  }

}

export default usdRates;
