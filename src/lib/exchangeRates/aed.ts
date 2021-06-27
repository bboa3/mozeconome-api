
const aedRates = (text: string) => {

  const buy = text.split('\n')[51].split(',').join('.');
  
  const sale = text.split('\n')[124].split(',').join('.');

  const medium = text.split('\n')[124].split(',').join('.');
  
  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'AED'
  }

}

export default aedRates;
