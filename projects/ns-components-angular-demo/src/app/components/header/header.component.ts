import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  selectedTheme: string = 'White';
  arrTheme = [
    { value: 'White', name: 'White' },
    { value: 'Black', name: 'Black' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialize or dispatch any necessary events
    console.log('Header Component initialized');
  }

  handleThemeChange(event: Event): void {
    const newTheme = (event.target as HTMLSelectElement).value;
    if (newTheme && newTheme !== '-1') {
      console.log(`Theme changed to ${newTheme}`);
      this.selectedTheme = newTheme;
    }
  }
}
