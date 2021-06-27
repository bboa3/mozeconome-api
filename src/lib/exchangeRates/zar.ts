
const zarRates = (text: string) => {

  const buy = text.split('\n')[50].split(',').join('.');
  
  const sale = text.split('\n')[123].split(',').join('.');

  const medium = text.split('\n')[147].split(',').join('.');

  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'ZAR'
  }

}

export default zarRates;
