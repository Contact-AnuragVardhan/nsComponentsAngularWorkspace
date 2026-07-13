import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-proficiency-renderer',
  standalone: true,
  imports: [],
  templateUrl: './proficiency-renderer.component.html',
  styleUrl: './proficiency-renderer.component.scss'
})
export class ProficiencyRendererComponent implements OnInit {
  @ViewChild('elementRef', { static: true }) elementRef!: ElementRef<HTMLDivElement>;



  item: any = {}; // Data for the renderer
  value: number = 0; // Proficiency value
  color: string = ''; // Background color for the proficiency bar

  ngOnInit(): void {

  }

  // Method to set the data and compute the proficiency bar's color
  setData(data: any, dataField: string, index: number, colIndex: number, row: any): void {
    const proficiencyValue: number = data['proficiency'];
    let color = '';

    if (proficiencyValue < 20) {
      color = '#f55d51';
    } else if (proficiencyValue < 60) {
      color = '#ffb300';
    } else {
      color = '#82d249';
    }

    this.value = proficiencyValue;
    this.color = color;
  }

  // Method to get the DOM element
  getElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
