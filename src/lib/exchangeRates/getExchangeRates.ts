import usdRates from './usd';
import zarRates from './zar';
import aedRates from './aed';
import audRates from './aud';
import brlRates from './brl';
import bwpRates from './bwp';
import cadRates from './cad';
import chfRates from './chf';
import cnyRates from './cny';
import dkkRates from './dkk';
import eurRates from './eur';
import gbpRates from './gbp';
import kwdRates from './kwd';
import murRates from './mur';
import nokRates from './nok';
import nzdRates from './nzd';
import sekRates from './sek';
import zmwRates from './zmw';

const getExchangeRates = (text: string) => {
  return [
    usdRates(text),
    zarRates(text),
    aedRates(text),
    audRates(text), 
    brlRates(text),
    bwpRates(text),
    cadRates(text),
    chfRates(text),
    cnyRates(text),
    dkkRates(text),
    eurRates(text),
    gbpRates(text),
    kwdRates(text),
    murRates(text),
    nokRates(text),
    nzdRates(text),
    sekRates(text),
    zmwRates(text),
  ]
}

export default getExchangeRates;