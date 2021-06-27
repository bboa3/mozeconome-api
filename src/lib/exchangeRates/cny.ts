
const cnyRates = (text: string) => {

  const buy = text.split('\n')[58].split(',').join('.');
  
  const sale = text.split('\n')[131].split(',').join('.');

  const medium = text.split('\n')[155].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'CNY'
  }

}

export default cnyRates;
