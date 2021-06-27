
const gbpRates = (text: string) => {

  const buy = text.split('\n')[63].split(',').join('.');
  
  const sale = text.split('\n')[136].split(',').join('.');

  const medium = text.split('\n')[160].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'GBP'
  }

}

export default gbpRates;
