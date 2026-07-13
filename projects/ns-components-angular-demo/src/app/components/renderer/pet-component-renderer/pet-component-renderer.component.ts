import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { INSMessageBoxAngularSetting, INSMessageBoxCustomSetting, NSMessageBoxAngular } from 'ns-components-angular';
import { PetComponentComponent } from '../pet-component/pet-component.component';
import { SharedModule } from '../../../modules/shared.module';
import { objImg } from '../../../util/images';

@Component({
  selector: 'app-pet-component-renderer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pet-component-renderer.component.html',
  styleUrl: './pet-component-renderer.component.scss'
})
export class PetComponentRendererComponent {
  @Input() data: any; // Data input
  @ViewChild('divImage', { static: true }) elementRef!: ElementRef;
  @ViewChild(NSMessageBoxAngular, { static: true }) modalRef!: NSMessageBoxAngular;

  value: string | null = null;
  modalSetting: INSMessageBoxAngularSetting = {
    enableModalCloseOnEscape: true,
    enableCloseIconVisibility: true,
  };

  constructor() {}

  ngOnInit(): void {}

  setData(
    data: any,
    dataField: string,
    index: number,
    colIndex: number,
    row: any
  ): void {
    const item = data;
    const originalValue = item['pet'];
    console.log(originalValue);
    this.value = originalValue;
  }

  viewHandler(): void {
    let url = objImg[this.value?.toLowerCase() || 'none'].url;
    url = url.replace('###width###', '500');
    const modalSettings: INSMessageBoxCustomSetting = {
      titleHtml: `View ${this.value}`,
      bodyComponent: PetComponentComponent,
      panelSetting: { width: '60%', height: '60%' },
      bodyComponentData: {
        name: this.value,
        url: url,
      },
      buttons: [
        {
          label: 'Close',
          callback: (event: any) => {
            this.modalRef.removeModal();
            event.stopPropagation();
          },
        },
      ],
    };
    this.modalRef.custom(modalSettings);
  }

}
