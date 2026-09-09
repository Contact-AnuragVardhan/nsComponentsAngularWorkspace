import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, fromEvent, debounceTime, takeUntil } from 'rxjs';
import { SharedModule } from '../../../modules/shared.module';
import { objImg } from '../../../util/images';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.scss'
})
export class AnimalComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Output() fullScreenChanged = new EventEmitter<boolean>();

  @ViewChild('elementRef', { static: true }) elementRef!: ElementRef<HTMLDivElement>;

  url: string | null = null;
  value: string | null = null;
  width: number = 500;

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    if (this.data) {
      this.init(this.data);
    }
    fromEvent(window, 'resize')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(() => {
        this.width = this.getWidth();
        if (this.url) {
          this.url = this.url.replace('###width###', this.width.toString());
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public init(data: any): void {
    this.url = objImg[data.name]?.url || null;
    this.value = data.name;
    this.width = this.getWidth();

    this.cdr.detectChanges();
  }

  public getElement(): HTMLElement | null {
    return this.elementRef?.nativeElement || null;
  }

  public elementAdded(): void {
    // Implementation for element added logic if needed
  }

  public getWidth(): number {
    let newWidth = 500;
    const element = this.elementRef?.nativeElement;
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.width > newWidth) {
        newWidth = rect.width - 50;
      }
    }
    return newWidth;
  }

  public onFullScreenChanged(isFullScreen: boolean): void {
    this.width = this.getWidth();
    this.fullScreenChanged.emit(isFullScreen);
  }
}
