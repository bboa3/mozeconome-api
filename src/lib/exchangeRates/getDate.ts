import { months } from "../../views/dateFormatar";

const getDateRates = (line3: string) => {

  const date = line3.split(' ');

  const year = Number(date[10]);
  const day = Number(date[6]);
  const month = date[8];

  function monthNumber() {
    return months.findIndex(mon => {
      return month.toLowerCase() === mon.toLowerCase()
    })
  }

  return new Date(year, monthNumber(), day);
}

export default getDateRates;