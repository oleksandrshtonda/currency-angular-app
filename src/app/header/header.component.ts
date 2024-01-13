import { Component, Input } from '@angular/core';
import { Currency } from '../EnumCurrency';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() currencyFromOutput: string;
  @Input() currencyToOutput: string;
  @Input() quantityFromOutput: number = 0;
  @Input() quantityToOutput: number = 0;
}
