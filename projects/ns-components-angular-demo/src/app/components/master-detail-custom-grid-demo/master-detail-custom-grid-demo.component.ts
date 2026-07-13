import { Component, OnInit, ViewChild } from '@angular/core';
import { NSGridAngular, INSGridAngularSetting, INSGridColumn, INSGridCustomClassSetting, INSGridMasterDetailSetting } from 'ns-components-angular';
import { SharedModule } from '../../modules/shared.module';
import { DetailGridRendererComponent } from '../renderer/detail-grid-renderer/detail-grid-renderer.component';

@Component({
  selector: 'app-master-detail-custom-grid-demo',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './master-detail-custom-grid-demo.component.html',
  styleUrl: './master-detail-custom-grid-demo.component.scss'
})
export class MasterDetailCustomGridDemoComponent implements OnInit {
  @ViewChild(NSGridAngular, { static: false }) gridRef!: NSGridAngular;

  gridSetting: INSGridAngularSetting | null = null;
  dataSource: any[] = [];

  ngOnInit(): void {
    this.initializeGrid();
    this.getData();
  }

  private initializeGrid(): void {
    const dateLabelFunction = (item: any, dataField: string, colItem: INSGridColumn): string => {
      if (item && item[dataField]) {
        const date = item[dataField];
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      }
      return '';
    };

    const gridDetailColumn: INSGridColumn[] = [
      { headerText: 'Id', dataField: 'id', width: '20%' },
      { headerText: 'Country', dataField: 'country', width: '15%' },
      { headerText: 'Hierarchy', dataField: 'hierarchy', width: '20%', headerTruncateToFit: true, truncateToFit: true },
      { headerText: 'Year', dataField: 'year', width: '20%' },
      { headerText: 'Employees', dataField: 'employees', width: '20%' },
      { headerText: 'Date', dataField: 'date', width: '20%', labelFunction: dateLabelFunction },
    ];

    const customClass: INSGridCustomClassSetting = {
      headerCell: 'columnClass',
      nonFirstBodyColumn: 'columnClass',
    };

    const masterDetailSetting: INSGridMasterDetailSetting = {
      hasChildField: 'hasChildren',
      detailRenderer: DetailGridRendererComponent,
      detailRendererParam: { label: 'Testing Code' },
      detailHeight: 200,
      detailDataSourceCallback: function (params: any): void {
        
      }
    };

    this.gridSetting = {
      type: NSGridAngular.GRID_TYPE_MASTER_DETAIL,
      masterDetailSetting: masterDetailSetting,
      enableVirtualScroll: true,
      enableColumnSetting: true,
      enableFilter: true,
      enableAdvancedFilter: true,
      rowKeyField: 'id',
      enableVariableRowHeight: true,
      enableRowSelection: false,
      enableExport: true,
      heightOffset: 170,
      columns: gridDetailColumn,
      customClass: customClass,
    };
  }

  private getData(): void {
    const totalRecords = 10;
    const arrItem: any[] = [];
    let hasLastCountryUS = false;

    for (let i = 0; i < totalRecords; i++) {
      const item: any = {
        id: i,
        hierarchy: 'hierarchy ' + (i + 1).toString(),
        supervisor: null,
        country: 'US',
        employees: 'Employee' + i,
        price: '10.90',
        year: '1985',
        date: new Date(2018, 11, i + 1),
        checked: true,
        hasChildren: i % 2 !== 0,
      };

      if (item.hasChildren) {
        if (hasLastCountryUS) {
          item.country = 'UK';
        }
        hasLastCountryUS = !hasLastCountryUS;
      }

      arrItem.push(item);
    }

    this.dataSource = arrItem;
  }
} 
