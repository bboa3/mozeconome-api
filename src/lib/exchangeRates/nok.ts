
const nokRates = (text: string) => {

  const buy = text.split('\n')[67].split(',').join('.');
  
  const sale = text.split('\n')[140].split(',').join('.');

  const medium = text.split('\n')[164].split(',').join('.');

  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'NOK'
  }

}

export default nokRates;
