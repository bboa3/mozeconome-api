
const sdrRates = (text: string) => {

  const buy = text.split('\n')[69].split(',').join('.');
  
  const sale = text.split('\n')[142].split(',').join('.');

  const medium = text.split('\n')[166].split(',').join('.');


  return {
    buy: Number(buy),
    sale: Number(sale),
    medium: Number(medium),
    iso_4217: 'SDR'
  }

}

export default sdrRates;
