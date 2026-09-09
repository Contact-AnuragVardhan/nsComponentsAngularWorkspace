import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavComponent } from './components/nav/nav.component';
import { GlobalContextService } from './service/global-context.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NavComponent, FooterComponent, LoadingSpinnerComponent],
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class App {
  protected readonly title = signal('ns-components-angular-demo');
  
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
