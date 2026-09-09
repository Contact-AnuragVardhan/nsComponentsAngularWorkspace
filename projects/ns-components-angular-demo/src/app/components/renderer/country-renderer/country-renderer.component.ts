import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-country-renderer',
  standalone: true,
  imports: [],
  templateUrl: './country-renderer.component.html',
  styleUrl: './country-renderer.component.scss'
})
export class CountryRendererComponent implements OnInit {
  @ViewChild('refElement', { static: true }) refElement!: ElementRef<HTMLSpanElement>;

  data: any = {}; // Data for the renderer
  dataField: string = ''; // Data field to render
  countryIcon: string = ''; // Country icon code
  value: string = ''; // Display value
  url: string = ''; // URL for the country flag

  ngOnInit(): void {

  }

  setData(data: any, dataField: string, index: number, colIndex: number, row: any): void {
    const url = `https://flagcdn.com/h20/${data["countryIcon"]}.png`;
    this.data = data;
    this.url = url;
    this.value = data[dataField];
  }

  getElement(): HTMLElement {
    return this.refElement.nativeElement;
  }

  elementAdded(): void {
    console.log('elementAdded');
  }

  getValue(): string {
    return this.value;
  }
}

