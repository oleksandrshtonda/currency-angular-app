import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { ConverterComponent } from './converter/converter.component';

export class DataTransfered {
  constructor(
    public currencyFrom: string,
    public currencyTo: string,
    public quantityTo: number,
  ) {}
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    ConverterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public currencyFromOutput = 'USD';
  public currencyToOutput = 'USD';
  public quantityFromOutput = 1;
  public quantityToOutput = 1;

  receiveData(data: DataTransfered) {
    this.currencyFromOutput = data.currencyFrom;
    this.currencyToOutput = data.currencyTo;
    this.quantityToOutput = data.quantityTo;
  }
}
