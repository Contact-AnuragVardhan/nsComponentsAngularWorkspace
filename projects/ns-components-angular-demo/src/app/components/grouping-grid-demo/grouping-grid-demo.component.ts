import { Component, OnInit, ViewChild } from '@angular/core';
import { NSGridAngular, INSGridCustomClassSetting, INSGridColumn, INSGridAngularSetting } from 'ns-components-angular';
import { SharedModule } from '../../modules/shared.module';
import { GlobalContextService } from '../../service/global-context.service';
import { CommonUtil } from '../../util/commonUtil';
@Component({
  selector: 'app-grouping-grid-demo',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './grouping-grid-demo.component.html',
  styleUrl: './grouping-grid-demo.component.scss'
})
export class GroupingGridDemoComponent implements OnInit {
  @ViewChild(NSGridAngular, { static: false }) gridRef!: NSGridAngular; // Reference to NSGridAngular

  groupBy: string = 'currency'; // Default group by field
  dataSource: any[] = []; // Data source for the grid
  gridSetting: INSGridAngularSetting | null = null; // Grid settings

  private commonUtil = new CommonUtil();
  arrGroupBy = [
    { value: 'currency', name: 'Currency' },
    { value: 'name', name: 'Country' },
    { value: 'phone', name: 'Phone Number' },
  ];

  constructor(public globalContext: GlobalContextService) {

  }

  ngOnInit(): void {
    this.groupBy = this.arrGroupBy[0].value;
    this.initializeGrid();
    this.getData();
  }

  private initializeGrid(): void {
    const customClass: INSGridCustomClassSetting = {
      headerCell: 'columnClass',
      nonFirstBodyColumn: 'columnClass',
    };

    const gridColumn: INSGridColumn[] = [
      { headerText: 'Currency', dataField: 'currency', width: '10%', enableFilter: false, sortable: false },
      { headerText: 'Country', dataField: 'name', width: '30%', filter: { advancedFilterPopUpPos: 'bottom-right' } },
      { headerText: 'Native', dataField: 'native', width: '20%', truncateToFit: true },
      { headerText: 'Capital', dataField: 'capital', width: '30%', truncateToFit: true },
      { headerText: 'Phone Number', dataField: 'phone', width: '15%' },
      { headerText: 'Continent', dataField: 'continent.name', width: '20%' },
    ];

    this.gridSetting = {
      type: NSGridAngular.GRID_TYPE_GROUP,
      groupByField: this.groupBy,
      columnResizable: true,
      columnSortable: true,
      columnDraggable: false,
      enableFilter: true,
      enableAdvancedFilter: true,
      columns: gridColumn,
      customClass: customClass,
      rowKeyField: 'code',
      heightOffset: 170,
      enableVirtualScroll: true,
    };
  }

  private getData(): void {
    const param = {
      operationName: 'Countries',
      variables: {},
      query: this.commonUtil.normalize(CommonUtil.ALL_COUNTRIES),
    };

    this.globalContext.fetchData('POST', CommonUtil.COUNTRIES_URL , null, param)
    .subscribe(response => {
      console.log(response);
      if (response?.data?.countries) {
        this.dataSource = response.data.countries;
      }
    }, error => {
      console.error(error);
    });
  }

  expandHandler(): void {
    if (this.gridRef) {
      this.gridRef.expandAll();
    }
  }

  collapseHandler(): void {
    if (this.gridRef) {
      this.gridRef.collapseAll();
    }
  }

  handleGroupByChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newGroupBy = target.value;

    if (newGroupBy && newGroupBy !== '-1' && this.gridRef) {
      this.gridRef.groupBy(newGroupBy);
    }
    this.groupBy = newGroupBy;
  }
}
