import { Component, OnInit, ViewChild } from '@angular/core';
import { INSNumericTextBoxAngularSetting, NSNumericTextBoxAngular } from 'ns-components-angular';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-numeric-textbox',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './numeric-textbox.component.html',
  styleUrl: './numeric-textbox.component.scss'
})
export class NumericTextboxComponent implements OnInit {

  @ViewChild('txtDemo') calSimple!: NSNumericTextBoxAngular;

  setting!: INSNumericTextBoxAngularSetting;
  amount: number = 20;
  displayCashAmount: string = '';

  ngOnInit(): void {
    this.setting = {type:"usd",enableDecimals: false,min:0,max:1000};
    this.amount = 20;
    //this.themeService.themeChanged.subscribe(() => this.themeChanged());
  }
}
