import { Component, OnInit, ViewChild } from '@angular/core';
import { NSGridAngular, INSGridCustomClassSetting, INSGridColumn, INSGridEditorSetting, INSGridAngularSetting } from 'ns-components-angular';
import { SharedModule } from '../../modules/shared.module';
import { DataGenerator } from '../../util/dataGenerator';
import { CountryRendererComponent } from '../renderer/country-renderer/country-renderer.component';
import { RealTimeRendererComponent } from '../renderer/real-time-renderer/real-time-renderer.component';
import { ProficiencyRendererComponent } from '../renderer/proficiency-renderer/proficiency-renderer.component';

@Component({
  selector: 'app-real-time-updates',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './real-time-updates.component.html',
  styleUrl: './real-time-updates.component.scss'
})
export class RealTimeUpdatesComponent implements OnInit {
  @ViewChild(NSGridAngular, { static: false }) gridRef!: NSGridAngular;

  gridSetting: INSGridAngularSetting | null = null;
  dataSource: any[] = [];
  private dataGenerator = new DataGenerator();

  ngOnInit(): void {
    this.initializeGrid();
    this.getData();
  }

  private initializeGrid(): void {
    const customClass: INSGridCustomClassSetting = {
      headerCell: 'columnClass',
      nonFirstBodyColumn: 'columnClass',
    };

    const gridColumn: INSGridColumn[] = [
      { headerText: 'Name', dataField: 'name', width: '200px', filter: { advancedFilterPopUpPos: 'bottom-right' } },
      { headerText: 'Country', dataField: 'country', width: '150px', truncateToFit: true, itemRendererComponent: CountryRendererComponent },
      { headerText: 'Language', dataField: 'language', width: '150px', truncateToFit: true },
      { headerText: 'Asset', dataField: 'asset', width: '180px', itemRendererComponent: RealTimeRendererComponent },
      { headerText: 'Proficiency', dataField: 'proficiency', width: '150px', itemRendererComponent: ProficiencyRendererComponent },
      { headerText: 'Phone', dataField: 'phoneNumber', width: '180px' },
    ];

    const editorSetting: INSGridEditorSetting = {
      clickType: NSGridAngular.EDITOR_EDITING_NOCLICK,
      enableMultipleEdit: true,
    };

    this.gridSetting = {
      type: NSGridAngular.GRID_TYPE_NORMAL,
      columnResizable: true,
      columnSortable: true,
      columnDraggable: false,
      enableFilter: true,
      enableAdvancedFilter: true,
      columns: gridColumn,
      customClass: customClass,
      rowKeyField: 'id',
      heightOffset: 170,
      enableVirtualScroll: true,
      editorSetting: editorSetting,
    };
  }

  private getData(): void {
      this.dataSource = this.dataGenerator.getRealTimeUpdates(20);
      this.refreshGrid();
  }

  private refreshGrid(): void {
    setInterval(() => {
      if (this.gridRef) {
        const arrItem: any[] = this.gridRef.getFilteredData();
        arrItem.forEach((item) => {
          item.prevAsset = item.asset;
          item.asset = this.dataGenerator.changeAsset();
          item.prevProficiency = item.proficiency;
          item.proficiency = this.dataGenerator.changeProficiency();
          const index: number = this.gridRef.getItemInfo(item).rowIndex;
          this.gridRef.updateCellByIndex(index, 'asset');
          this.gridRef.updateCellByIndex(index, 'proficiency');
        });
      }
    }, 2000);
  }
}
