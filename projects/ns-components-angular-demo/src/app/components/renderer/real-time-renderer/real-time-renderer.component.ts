import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-real-time-renderer',
  standalone: true,
  imports: [],
  templateUrl: './real-time-renderer.component.html',
  styleUrl: './real-time-renderer.component.scss'
})
export class RealTimeRendererComponent implements OnInit {
  @ViewChild('elementRef', { static: true }) elementRef!: ElementRef<HTMLDivElement>;

  item: any | null = null; // The item to render
  value: number | null = null; // The value to display
  delta: number | null = null; // The delta value
  deltaUp: boolean = true; // Direction of the delta
  lastValue: number = 0; // Last value for comparison
  refreshCount: number = 0; // Refresh counter for delta removal

  ngOnInit(): void {
    
  }

  // Method to set the data and compute deltas
  setData(data: any, dataField: string, index: number, colIndex: number, row: any): void {
    const newValue: number = data[dataField];
    let deltaChange: number | null = null;

    if (newValue !== this.lastValue) {
      if (typeof newValue === 'number' && typeof data.prevAsset === 'number') {
        deltaChange = newValue - data.prevAsset;
      }

      this.lastValue = newValue;
      this.item = data;
      this.value = newValue;
      this.delta = Math.abs(deltaChange || 0);
      this.deltaUp = (deltaChange || 0) >= 0;

      this.removeDelta();
    }
  }

  // Helper function to remove delta after a timeout
  private removeDelta(): void {
    const currentRefreshCount = this.refreshCount + 1;
    this.refreshCount = currentRefreshCount;

    setTimeout(() => {
      if (currentRefreshCount === this.refreshCount) {
        this.delta = null;
      }
    }, 2000);
  }

  // Method to get the DOM element
  getElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
