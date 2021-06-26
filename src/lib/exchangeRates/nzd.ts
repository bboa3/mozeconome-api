
const nzdRates = (text: string) => {

  const buy = text.split('\n')[68];
  
  const sale = text.split('\n')[141];

  const medium = text.split('\n')[165];

  return {
    buy,
    sale,
    medium
  }

}

export default nzdRates;
