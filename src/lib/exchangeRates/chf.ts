
const chfRates = (text: string) => {

  const buy = text.split('\n')[57].split(',').join('.');
  
  const sale = text.split('\n')[130].split(',').join('.');

  const medium = text.split('\n')[154].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'CHF'
  }

}

export default chfRates;
