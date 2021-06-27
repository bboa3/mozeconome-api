
const cadRates = (text: string) => {

  const buy = text.split('\n')[56].split(',').join('.');
  
  const sale = text.split('\n')[129].split(',').join('.');

  const medium = text.split('\n')[153].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'CAD'
  }

}

export default cadRates;
