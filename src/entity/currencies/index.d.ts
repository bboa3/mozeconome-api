export interface ISO {
  code: string,
	number: number
} 

export interface Units {
  major: {
    name: string
    symbol: string
  }
  minor: {
    name: string
    symbol: string
    majorValue: number
  }
}

export interface Banknotes {
  frequent: string[]
	rare: string[]
}

export interface Banknotes {
  frequent: string[]
  rare: string[]
}

export interface Currency {
		name: string
		iso: ISO
		units: Units
		banknotes: Banknotes
		coins: Banknotes
}