
const eurRates = (text: string) => {

  const buy = text.split('\n')[61].split(',').join('.');

  const sale = text.split('\n')[134].split(',').join('.');

  const medium = text.split('\n')[158].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'EUR'
  }

}

export default eurRates;
