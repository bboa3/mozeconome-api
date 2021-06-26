
const audRates = (text: string) => {

  const buy = text.split('\n')[52];
  
  const sale = text.split('\n')[125];

  const medium = text.split('\n')[149];


  return {
    buy,
    sale,
    medium
  }

}

export default audRates;
