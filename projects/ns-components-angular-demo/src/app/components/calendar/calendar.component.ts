import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalContextService } from '../../service/global-context.service';
import { SharedModule } from '../../modules/shared.module';
import { NSCalendarAngular } from 'ns-components-angular';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  @ViewChild('calSimple', { static: false }) calSimple!: NSCalendarAngular;
  @ViewChild('calMinMax', { static: false }) calMinMax!: NSCalendarAngular;
  @ViewChild('calDisabled', { static: false }) calDisabled!: NSCalendarAngular;
  @ViewChild('calFooter', { static: false }) calFooter!: NSCalendarAngular;

  constructor(public globalContext: GlobalContextService) {

  }

  ngOnInit(): void {
    /*const { theme, oldTheme } = this.themeService.getTheme();
    this.theme = theme;
    this.oldTheme = oldTheme;*/
  }

  ngAfterViewInit(): void {
    this.themeChanged();
  }

  themeChanged(): void {
    /*if (this.theme !== this.oldTheme) {
      if (this.calSimple) {
        this.calSimple.nativeElement.setTheme(this.theme);
      }
      if (this.calMinMax) {
        this.calMinMax.nativeElement.setTheme(this.theme);
      }
      if (this.calDisabled) {
        this.calDisabled.nativeElement.setTheme(this.theme);
      }
      if (this.calFooter) {
        this.calFooter.nativeElement.setTheme(this.theme);
      }
    }*/
  }

  dateSelected(type: string, destID: string, event: any): void {
    const div = document.getElementById(destID);
    if (div && event instanceof Date) {
      div.innerHTML = event.toISOString();
    }
  }
}
