
const audRates = (text: string) => {

  const buy = text.split('\n')[52].split(',').join('.');
  
  const sale = text.split('\n')[125].split(',').join('.');

  const medium = text.split('\n')[149].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'AUD', 
  }

}

export default audRates;
