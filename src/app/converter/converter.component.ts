import { Component, EventEmitter, Output  } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Currency } from '../EnumCurrency';
import { CurrencyConvertService } from '../services/currency-convert.service';

interface Data {
  rates: {
    'USD': number,
    'EUR': number,
    'UAH': number,
  }
}

export class DataTransfered {
  constructor(
    public currencyFrom: string,
    public currencyTo: string,
    public quantityTo: number
  ) {}
}

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent {
  currencyFrom = new FormControl(Currency.USD, { nonNullable: true });
  quantityFrom = new FormControl(0, { nonNullable: true });
  currencyTo = new FormControl(Currency.USD, { nonNullable: true });
  quantityTo = new FormControl(0, { nonNullable: true });

  @Output() dataEvent = new EventEmitter<DataTransfered>();

  sendData() {
    this.getActualCurrencies().then(() => {
      const inOtherCurrency = this.actualCurrency.rates[this.currencyTo.value];
      const data = new DataTransfered(this.currencyFrom.value, this.currencyTo.value, inOtherCurrency);
      this.dataEvent.emit(data);
    })
  }

  actualCurrency: Data = {} as Data;
  isUpdating = false;

  constructor(
    private currencyService: CurrencyConvertService
  ) {}

  ngOnInit() {
    this.quantityFrom.valueChanges.subscribe(() => this.updateConvertedValue());
    this.currencyFrom.valueChanges.subscribe(() => this.updateConvertedValue());

    this.quantityTo.valueChanges.subscribe(() => this.updateConvertedValueReverse());
    this.currencyTo.valueChanges.subscribe(() => this.updateConvertedValueReverse());
  }

  async getActualCurrencies(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.currencyService.convert(this.currencyFrom.value as Currency)
        .subscribe((res) => {
          this.actualCurrency = res as Data;
          resolve();
        });
    });
  }

  updateConvertedValue() {
    if (!this.isUpdating && this.quantityFrom.valid) {
      this.getActualCurrencies().then(() => {
        this.isUpdating = true;
        const calculated = this.calculate(this.quantityFrom.value);
        this.quantityTo.setValue(calculated);
        this.isUpdating = false;
      });
    }
  }

  updateConvertedValueReverse() {
    if (!this.isUpdating && this.quantityTo.valid) {
      this.getActualCurrencies().then(() => {
        this.isUpdating = true;
        const calculated = this.calculateReverse(this.quantityTo.value);
        this.quantityFrom.setValue(calculated);
        this.isUpdating = false;
      });
    }
  }

  calculate(from: number): number {
    return this.actualCurrency && this.actualCurrency.rates
      ? (this.actualCurrency.rates[this.currencyTo.value] || 0) * from
      : 0;
  }

  calculateReverse(to: number): number {
    return this.actualCurrency && this.actualCurrency.rates
      ? (1 / (this.actualCurrency.rates[this.currencyTo.value] || 1)) * to
      : 0;
  }
}
