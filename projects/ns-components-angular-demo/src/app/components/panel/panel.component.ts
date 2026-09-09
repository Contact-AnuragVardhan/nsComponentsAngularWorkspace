import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

}
