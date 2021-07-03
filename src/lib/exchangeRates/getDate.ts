
const getDateRates = (text: string) => {

  const line = text.split('\n')[99].split(' ');


  const date = line[1].split('.');
  const time = line[2].split(':');

  const year = Number(date[2]);
  const month = Number(date[1]) - 1;
  const day = Number(date[0]);

  const hours = Number(time[0]);
  const minutes = Number(time[1]);
  const seconds = Number(time[2]);

  return new Date(year, month, day, hours, minutes, seconds);
}

export default getDateRates;