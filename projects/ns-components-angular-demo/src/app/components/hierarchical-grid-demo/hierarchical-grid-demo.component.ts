import { Component, OnInit, ViewChild } from '@angular/core';
import { INSGridAngularSetting, INSGridColumn, INSGridCustomClassSetting, INSGridEditorSetting, NSGridAngular } from 'ns-components-angular';
import { SharedModule } from '../../modules/shared.module';
import { GlobalContextService } from '../../service/global-context.service';
import { DataGenerator } from '../../util/dataGenerator';
import { PetComponentRendererComponent } from '../renderer/pet-component-renderer/pet-component-renderer.component';

@Component({
  selector: 'app-hierarchical-grid-demo',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './hierarchical-grid-demo.component.html',
  styleUrl: './hierarchical-grid-demo.component.scss'
})
export class HierarchicalGridDemoComponent implements OnInit {
  @ViewChild(NSGridAngular, { static: false }) grid!: NSGridAngular;

  gridSetting: INSGridAngularSetting | null = null;
  dataSource: any[] = [];
  private dataGenerator = new DataGenerator();

  constructor(public globalContext: GlobalContextService) {

  }

  ngOnInit(): void {
    this.initializeGrid();
  }

  private initializeGrid(): void {
    this.initializeGridSettings();
    this.dataSource = this.dataGenerator.getHierarchicalData(100);
  }

  private initializeGridSettings(): void {
    const customClass: INSGridCustomClassSetting = {
      headerCell: 'columnClass',
      nonFirstBodyColumn: 'columnClass',
    };

    const gridColumn: INSGridColumn[] = [
      { headerText: 'Name', dataField: 'name', width: '150px', filter: { advancedFilterPopUpPos: 'bottom-right' } },
      { headerText: 'Country', dataField: 'country', width: '100px', truncateToFit: true },
      { headerText: 'Language', dataField: 'language', width: '100px', truncateToFit: true },
      { headerText: 'Asset', dataField: 'asset', width: '80px' },
      { headerText: 'Proficiency', dataField: 'proficiency', width: '80px' },
      { headerText: 'Phone', dataField: 'phoneNumber', width: '100px' },
      {
        headerText: 'Pet',
        dataField: 'pet',
        width: '200px',
        enableFilter: false,
        sortable: false,
        itemRendererComponent: PetComponentRendererComponent,
        itemRendererComponentParam: { abc: "123", def: "456" },
      },
    ];

    const editorSetting: INSGridEditorSetting = {
      clickType: NSGridAngular.EDITOR_EDITING_NOCLICK,
      enableMultipleEdit: true,
    };

    this.gridSetting = {
      type: NSGridAngular.GRID_TYPE_HIERARCHICAL,
      columnResizable: true,
      columnSortable: true,
      columnDraggable: false,
      enableFilter: true,
      enableAdvancedFilter: true,
      columns: gridColumn,
      customClass: customClass,
      rowKeyField: 'employeeId',
      heightOffset: 170,
      enableVirtualScroll: true,
      //theme: this.theme || undefined,
    };
  }

  expandAll(): void {
    if (this.grid) {
      this.grid.expandAll();
    }
  }

  collapseAll(): void {
    if (this.grid) {
      this.grid.collapseAll();
    }
  }
  
}
