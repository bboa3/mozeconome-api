
const dkkRates = (text: string) => {

  const buy = text.split('\n')[60];
  
  const sale = text.split('\n')[133];

  const medium = text.split('\n')[157];


  return {
    buy,
    sale,
    medium
  }

}

export default dkkRates;
