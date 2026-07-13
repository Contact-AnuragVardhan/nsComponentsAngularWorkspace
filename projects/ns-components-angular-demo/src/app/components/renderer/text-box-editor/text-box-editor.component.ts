import { Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-text-box-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './text-box-editor.component.html',
  styleUrl: './text-box-editor.component.scss',
})
export class TextBoxEditorComponent implements OnInit {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef<HTMLInputElement>;

  innerValue: string = ''; // Holds the current value
  private data: any; // Holds the data passed to `init`

  ngOnInit(): void {
    this.focusInput();
  }

  init(data: any): void {
    console.log('init called with data:', data);
    this.innerValue = data.defaultValue || '';
    this.data = data;
  }

  // Focus on the input element when the component is initialized
  private focusInput(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  // Get the current value
  getValue(): string {
    return this.innerValue;
  }

  // Called when the value of the input changes
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.innerValue = target.value;
  }
}
