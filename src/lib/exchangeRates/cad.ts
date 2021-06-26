
const cadRates = (text: string) => {

  const buy = text.split('\n')[56];
  
  const sale = text.split('\n')[129];

  const medium = text.split('\n')[153];


  return {
    buy,
    sale,
    medium
  }

}

export default cadRates;
