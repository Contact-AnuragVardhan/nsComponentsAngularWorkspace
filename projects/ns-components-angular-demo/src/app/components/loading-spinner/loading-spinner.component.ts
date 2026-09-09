import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent implements OnInit {
  private __element: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.__element = elementRef.nativeElement;
    this.hide();
  }

  ngOnInit(): void {

  }

  show(): void {
    this.__showHide(true);
  }

  hide(): void {
    this.__showHide(false);
  }

  private __showHide(isShow: Boolean): void {
    if (this.__element) {
      this.__element.style.display = isShow ? "block" : "none";
    }
  }
}
