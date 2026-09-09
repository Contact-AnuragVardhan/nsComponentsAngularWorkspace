import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { NSTableRowMoverAngularDirective } from 'ns-components-angular';

interface Column {
  headerText: string;
  dataField: keyof DataSourceType;
  width?: string;
}

interface DataSourceType {
  id: number;
  name: string;
  status: string;
  isMovable: boolean;
  order: number;
}

@Component({
  selector: 'app-table-row-mover',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './table-row-mover.component.html',
  styleUrls: ['./table-row-mover.component.css']
})
export class TableRowMoverComponent implements OnInit {

  @ViewChild('tblData', { read: NSTableRowMoverAngularDirective })
  private tableRowMover!: NSTableRowMoverAngularDirective;

  arrCols: Column[] = [
    { headerText: 'ID', dataField: 'id', width: '50px' },
    { headerText: 'Name', dataField: 'name', width: '150px' },
    { headerText: 'Status', dataField: 'status', width: '100px' }
  ];

  dataSource: DataSourceType[] = [];
  tableRowMoverSetting: any;

  ngOnInit(): void {
    this.generateDataSource(20); 
    this.initializeRowMover();
    this.refreshRows();
  }

  private generateDataSource(count: number): void {
    this.dataSource = Array.from({ length: count }, (_, index) => {
      return {
        id: index + 1,
        name: `Workflow ${index + 1}`,
        status: index % 2 === 0 ? 'Active' : 'Inactive',
        isMovable: index % 3 !== 0, // Every third row is non-movable
        order: index + 1
      };
    });
  }

  private refreshRows(): void {
    setTimeout(() => {
      this.tableRowMover.processRows();
    }, 1000);
  }

  private initializeRowMover(): void {
    if (!this.tableRowMoverSetting) {
      const customClass: any = { dragRow: 'draggableRow' };
      this.tableRowMoverSetting = {
        isSameTableMove: true,
        customClass: customClass,
        dragEndHandler: this.dropEndHandler.bind(this)
      };
    }
  }

  private dropEndHandler(currentRow: any, item: any): void {
    console.log(item);
    if (item && item.oldIndex !== undefined && item.newIndex !== undefined && item.oldIndex !== item.newIndex) {
      const oldIndex: number = item.oldIndex - 1;
      const newIndex: number = item.newIndex - 1;
      this.dataSource.splice(newIndex, 0, this.dataSource.splice(oldIndex, 1)[0]);
      this.refreshOrder();
    }
  }

  private refreshOrder(): void {
    if (this.dataSource) {
      for (let count = 0; count < this.dataSource.length; count++) {
        this.dataSource[count].order = count + 1;
      }
    }
  }

  removeRecord(event: Event, workflow: any, index: number): void {
    this.dataSource.splice(index, 1);
    this.refreshOrder();
  }
}
