
const brlRates = (text: string) => {

  const buy = text.split('\n')[53].split(',').join('.');
  
  const sale = text.split('\n')[126].split(',').join('.');

  const medium = text.split('\n')[150].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'BRL'
  }

}

export default brlRates;
