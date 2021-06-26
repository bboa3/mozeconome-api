
const zarRates = (text: string) => {

  const buy = text.split('\n')[50];
  
  const sale = text.split('\n')[123];

  const medium = text.split('\n')[147];

  return {
    buy,
    sale,
    medium
  }

}

export default zarRates;
