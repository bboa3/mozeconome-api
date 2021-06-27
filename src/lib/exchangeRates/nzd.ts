
const nzdRates = (text: string) => {

  const buy = text.split('\n')[68].split(',').join('.');
  
  const sale = text.split('\n')[141].split(',').join('.');

  const medium = text.split('\n')[165].split(',').join('.');

  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'NZD'
  }

}

export default nzdRates;
