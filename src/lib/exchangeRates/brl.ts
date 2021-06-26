
const brlRates = (text: string) => {

  const buy = text.split('\n')[53];
  
  const sale = text.split('\n')[126];

  const medium = text.split('\n')[150];


  return {
    buy,
    sale,
    medium
  }

}

export default brlRates;
