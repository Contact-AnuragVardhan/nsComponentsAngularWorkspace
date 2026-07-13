import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { GlobalContextService } from './service/global-context.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NavComponent, FooterComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(LoadingSpinnerComponent)
  private loadingComp!: LoadingSpinnerComponent;

  constructor(private contextService: GlobalContextService) {
  }

  ngOnInit(): void {
    this.contextService.loadingComponent = this.loadingComp;
  }

  ngAfterViewInit(): void {
    this.contextService.loadingComponent = this.loadingComp;
  }
}
