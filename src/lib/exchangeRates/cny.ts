
const cnyRates = (text: string) => {

  const buy = text.split('\n')[58];
  
  const sale = text.split('\n')[131];

  const medium = text.split('\n')[155];


  return {
    buy,
    sale,
    medium
  }

}

export default cnyRates;
