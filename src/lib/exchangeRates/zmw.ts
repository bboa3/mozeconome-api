
const zmwRates = (text: string) => {

  const buy = text.split('\n')[71].split(',').join('.');

  const sale = text.split('\n')[144].split(',').join('.');

  const medium = text.split('\n')[168].split(',').join('.');

  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'ZMW'
  }

}

export default zmwRates;
