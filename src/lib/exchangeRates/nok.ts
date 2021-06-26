
const nokRates = (text: string) => {

  const buy = text.split('\n')[67];
  
  const sale = text.split('\n')[140];

  const medium = text.split('\n')[164];

  return {
    buy,
    sale,
    medium
  }

}

export default nokRates;
