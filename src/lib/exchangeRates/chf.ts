
const chfRates = (text: string) => {

  const buy = text.split('\n')[57];
  
  const sale = text.split('\n')[130];

  const medium = text.split('\n')[154];


  return {
    buy,
    sale,
    medium
  }

}

export default chfRates;
