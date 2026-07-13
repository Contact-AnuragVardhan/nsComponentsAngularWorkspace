import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-pet-component',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pet-component.component.html',
  styleUrl: './pet-component.component.scss'
})
export class PetComponentComponent {
  @Input() data: { url: string; name: string } | null = null; // Input to receive data
  @ViewChild('divImageCon', { static: true }) elementRef!: ElementRef<HTMLDivElement>;

  url: string | null = null;
  value: string | null = null;

  ngOnInit(): void {
    // Initialize values from the input data
    if (this.data) {
      this.url = this.data.url;
      this.value = this.data.name;
    }
  }

  /**
   * Initializes the component with the given data.
   * @param data - The data object containing `url` and `name`.
   */
  init(data: { url: string; name: string }): void {
    this.url = data.url;
    this.value = data.name;
  }

  /**
   * Exposes the DOM element for external use.
   * @returns The native element of the component.
   */
  getElement(): HTMLDivElement {
    return this.elementRef.nativeElement;
  }

  /**
   * Called when the element is added to the DOM.
   */
  elementAdded(): void {
    // Custom behavior can be implemented here
  }
}
