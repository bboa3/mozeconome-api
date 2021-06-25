export const months = [
  "Janeiro",
  "Fevereiro", 
  "Março", 
  "Abril", 
  "Maio", 
  "Junho", 
  "Julho",
  "Agosto", 
  "Setembro", 
  "Outubro", 
  "Novembro", 
  "Dezembro"
]

export const weekDays = [
  "Domingo", 
  "Segunda-Feira", 
  "Terça-Feira", 
  "Quarta-Feira", 
  "Quinta-Feira", 
  "Sexta-Feira", 
  "Sábado"
]

const dateFormatar = (date: Date) => {

  return `
    ${weekDays[date.getDay()]} 
    ${date.getDate()} de 
    ${months[date.getMonth()]} de 
    ${date.getFullYear()}
  `
}

export default dateFormatar;