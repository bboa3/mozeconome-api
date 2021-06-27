
const kwdRates = (text: string) => {

  const buy = text.split('\n')[65].split(',').join('.');
  
  const sale = text.split('\n')[138].split(',').join('.');

  const medium = text.split('\n')[162].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'KWD'
  }

}

export default kwdRates;
