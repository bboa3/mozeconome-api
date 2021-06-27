
const usdRates = (text: string) => {

  const buy = text.split('\n')[49].split(',').join('.');
  
  const sale = text.split('\n')[122].split(',').join('.');

  const medium = text.split('\n')[146].split(',').join('.');

  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'USD'
  }

}

export default usdRates;
