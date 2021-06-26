
const sdrRates = (text: string) => {

  const buy = text.split('\n')[69];
  
  const sale = text.split('\n')[142];

  const medium = text.split('\n')[166];


  return {
    buy,
    sale,
    medium
  }

}

export default sdrRates;
