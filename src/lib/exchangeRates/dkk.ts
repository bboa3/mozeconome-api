
const dkkRates = (text: string) => {

  const buy = text.split('\n')[60].split(',').join('.');
  
  const sale = text.split('\n')[133].split(',').join('.');

  const medium = text.split('\n')[157].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'DKK'
  }

}

export default dkkRates;
