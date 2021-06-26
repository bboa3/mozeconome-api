
const murRates = (text: string) => {

  const buy = text.split('\n')[66];
  
  const sale = text.split('\n')[139];

  const medium = text.split('\n')[163];

  return {
    buy,
    sale,
    medium
  }

}

export default murRates;
