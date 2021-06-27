
const murRates = (text: string) => {

  const buy = text.split('\n')[66].split(',').join('.');
  
  const sale = text.split('\n')[139].split(',').join('.');

  const medium = text.split('\n')[163].split(',').join('.');

  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'MUR'
  }

}

export default murRates;
