import { rates, info } from "@prisma/client";


interface Rates extends rates {
  info: info
}


export default {
  render(rate: Rates) {
    return {
      buy: rate.buy,
      sale: rate.sale,
      medium: rate.medium,
      date: rate.info.date
    };
  },

  renderMany(rates: Rates[]) {
    return rates.map(rate => this.render(rate));
  }
}