
const aedRates = (text: string) => {

  const buy = text.split('\n')[51]
  
  const sale = text.split('\n')[124];

  const medium = text.split('\n')[124];
  return {
    buy,
    sale,
    medium
  }

}

export default aedRates;
