import { Component, OnInit, ViewChild } from '@angular/core';
import { NSGridAngular, INSGridAngularSetting, INSGridColumn, INSGridDetailRendererComponentParam } from 'ns-components-angular';
import { SharedModule } from '../../../modules/shared.module';

interface ISourceItem {
  id: number;
  hierarchy: string;
  supervisor: string;
  country: string;
  employees: string;
  price: number;
  year: number;
  checked: boolean;
  date: Date;
}


@Component({
  selector: 'app-detail-grid-renderer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './detail-grid-renderer.component.html',
  styleUrl: './detail-grid-renderer.component.scss'
})
export class DetailGridRendererComponent implements OnInit {
  @ViewChild('grid', { static: false }) gridRef!: NSGridAngular;

  gridSetting: INSGridAngularSetting | null = null;
  dataSource: any[] = [];
  data: any = { id: -1, country: "", hierarchy: "" };

  ngOnInit(): void {
    this.initializeGrid();
  }

  initializeGrid(): void {
    const gridDetailColumn: INSGridColumn[] = [
      { headerText: 'Id', dataField: 'id', width: '200px', sortable: true, sortDescending: true, sortType: 'number' },
      { headerText: 'Country', dataField: 'country', width: '200px', sortable: true, sortDescending: true },
      {
        headerText: 'Employees',
        dataField: 'employees',
        width: '300px',
        sortable: false,
        sortDescending: true,
        headerTruncateToFit: true,
        truncateToFit: true,
      },
      { headerText: 'Price', dataField: 'price', toolTipField: 'price', width: '300px', sortable: true, sortDescending: true },
      { headerText: 'Hierarchy', dataField: 'hierarchy', width: '300px', sortable: true, sortDescending: false },
      { headerText: 'Year', dataField: 'year', width: '200px', sortable: true, sortDescending: true },
    ];

    this.gridSetting = {
      type: 'normal',
      enableFilter: true,
      columns: gridDetailColumn,
      rowKeyField: 'id',
      customClass: { headerCell: 'columnClass', nonFirstBodyColumn: 'columnClass' },
    };
  }

  generateSource(masterItem: { country: string; hierarchy: string }): ISourceItem[] {
    const totalRecords = 50;
    const arrItem: ISourceItem[] = [];
    for (let count = 0; count < totalRecords; count++) {
      const item: ISourceItem = {
        id: count,
        hierarchy: `${masterItem.hierarchy} ${count}`,
        supervisor: `Supervisor ${count}`,
        country: masterItem.country,
        employees: `Employees ${count}`,
        price: 10 * count,
        year: 1985 + count,
        checked: false,
        date: new Date(),
      };
      arrItem.push(item);
    }

    return arrItem;
  }

  init(param: INSGridDetailRendererComponentParam) {
    this.data = param.masterData;
  }

  elementAdded(param: INSGridDetailRendererComponentParam) {
    console.log("elementAdded");
    const source: ISourceItem[] = this.generateSource(this.data);
    this.dataSource = source;
  }

  renderEverytime(rowIndex: number): boolean {
    return rowIndex % 4 === 0;
  }
}
