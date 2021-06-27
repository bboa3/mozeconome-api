
const sekRates = (text: string) => {

  const buy = text.split('\n')[70].split(',').join('.');
  
  const sale = text.split('\n')[143].split(',').join('.');

  const medium = text.split('\n')[167].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'SEK'
  }

}

export default sekRates;
