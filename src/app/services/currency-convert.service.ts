import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../EnumCurrency';

const API_URL = 'https://open.er-api.com/v6/latest'

@Injectable({
  providedIn: 'root'
})
export class CurrencyConvertService {

  constructor(
    private http: HttpClient
  ) { }

  convert(currencyFrom: Currency) {
    return this.http.get(`${API_URL}/${currencyFrom}`);
  }
}
