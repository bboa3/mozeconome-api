
const zmwRates = (text: string) => {

  const buy = text.split('\n')[71];

  const sale = text.split('\n')[144];

  const medium = text.split('\n')[168];

  return {
    buy,
    sale,
    medium
  }

}

export default zmwRates;
