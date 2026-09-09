import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  arrComp = [
    { label: 'Grid (Tree Grid, Flat Grid)' },
    { label: 'Editor' },
    { label: 'Calendar' },
    { label: 'Date Picker' },
    { label: 'Multiselect Dropdown' },
    { label: 'Textbox' },
    { label: 'Panel' },
    { label: 'Dashboard' },
    { label: 'Message Box' },
    { label: 'Message Bar' },
    { label: 'Navigation' },
    { label: 'Divider Box' },
    { label: 'Tab Navigator' },
    { label: 'Image Processor' },
  ];

  arrUtilities = [
    { label: 'Ajax' },
    { label: 'Docx Export' },
    { label: 'XLSX Export' },
    { label: 'Resizable Table' },
    { label: 'Router' },
  ];

  styleOl = { 'list-style-type': 'decimal' };
  styleSpan = { 'font-weight': 'bold' };
}
