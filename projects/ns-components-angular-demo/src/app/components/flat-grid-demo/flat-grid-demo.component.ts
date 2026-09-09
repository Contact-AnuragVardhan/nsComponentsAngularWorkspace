import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { NSGridAngular, INSGridCustomClassSetting, INSGridColumnEditorSetting, INSGridColumn, INSGridEditorSetting, INSGridAngularSetting } from 'ns-components-angular';
import { GlobalContextService } from '../../service/global-context.service';
import { CommonUtil } from '../../util/commonUtil';
import { TextBoxEditorComponent } from '../renderer/text-box-editor/text-box-editor.component';

@Component({
  selector: 'app-flat-grid-demo',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './flat-grid-demo.component.html',
  styleUrl: './flat-grid-demo.component.scss'
})
export class FlatGridDemoComponent implements OnInit {
  @ViewChild(NSGridAngular, { static: false }) gridRef!: NSGridAngular;

  gridSetting: INSGridAngularSetting | null = null;
  dataSource: any[] = [];
  private commonUtil = new CommonUtil();

  constructor(private globalContext: GlobalContextService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeGrid();
    this.getData();
  }

  private initializeGrid(): void {
    const customClass: INSGridCustomClassSetting = {
      headerCell: 'columnClass',
      nonFirstBodyColumn: 'columnClass',
    };

    const textEditorSetting: INSGridColumnEditorSetting = {
      type: NSGridAngular.EDITOR_TYPE_CUSTOM,
      customEditor: TextBoxEditorComponent,
    };

    const gridColumn: INSGridColumn[] = [
      {
        headerText: '',
        dataField: 'isEdit',
        width: '5%',
        draggable: false,
        sortable: false,
        sortDescending: false,
        itemRenderer: (item, dataField, rowIndex, columnIndex, row) => this.editItemRenderer(item, dataField, rowIndex, columnIndex, row),
        isExportable: false,
        showMenu: false,
        enableFilter: false,
        filter: { enableAdvancedFilter: false },
        enableEditable: false,
      },
      { headerText: 'Country', dataField: 'name', width: '15%', filter: { advancedFilterPopUpPos: 'bottom-right' }, enableEditable: false },
      { headerText: 'Native', dataField: 'native', width: '15%', truncateToFit: true, enableEditable: false },
      { headerText: 'Capital', dataField: 'capital', width: '15%', truncateToFit: true, enableEditable: false },
      { headerText: 'Phone Number', dataField: 'phone', width: '15%', enableEditable: false },
      { headerText: 'Continent', dataField: 'continent.name', width: '15%', enableEditable: false },
      { headerText: 'Currency', dataField: 'currency', width: '20%', enableFilter: false, sortable: false, editorSetting: textEditorSetting },
    ];

    const editorSetting: INSGridEditorSetting = {
      editType: NSGridAngular.EDITOR_EDITTYPE_ROW,
      clickType: NSGridAngular.EDITOR_EDITING_NOCLICK,
      enableMultipleEdit: false,
    };

    this.gridSetting = {
      type: NSGridAngular.GRID_TYPE_NORMAL,
      columnResizable: true,
      columnSortable: true,
      columnDraggable: false,
      enableFilter: true,
      enableAdvancedFilter: true,
      enableEditable: true,
      columns: gridColumn,
      customClass: customClass,
      rowKeyField: 'code',
      heightOffset: 170,
      enableVirtualScroll: true,
      editorSetting: editorSetting,
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
        this.cdr.detectChanges();
      }
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  editItemRenderer(item: any, dataField: string, rowIndex: number, columnIndex: number, row: any): HTMLElement {
    const span = document.createElement('span');

    if (item) {
      if (typeof item.isEdit === 'undefined' || !item.isEdit) {
        const editIcon = document.createElement('i');
        editIcon.className = 'fa fa-pencil-square-o';
        editIcon.title = 'Click here to Edit';
        editIcon.addEventListener('click', () => {
          item.isEdit = true;
          this.gridRef.updateItemInDataSource(item);
          this.gridRef.updateCellByKeyField(item['code'], dataField);
          this.gridRef.editByItem(item);
        });
        span.appendChild(editIcon);
      } else {
        const cancelIcon = document.createElement('i');
        cancelIcon.className = 'fa fa-undo';
        cancelIcon.title = 'Click here to Cancel';
        cancelIcon.style.marginRight = '10px';
        cancelIcon.addEventListener('click', () => {
          item.isEdit = false;
          this.gridRef.updateItemInDataSource(item);
          this.gridRef.updateCellByKeyField(item['code'], dataField);
          this.gridRef.editStopByItem(item, '', true);
        });
        span.appendChild(cancelIcon);

        const saveIcon = document.createElement('i');
        saveIcon.className = 'fa fa-save';
        saveIcon.title = 'Click here to Save';
        saveIcon.addEventListener('click', () => {
          item.isEdit = false;
          this.gridRef.updateItemInDataSource(item);
          this.gridRef.updateCellByKeyField(item['code'], dataField);
          this.gridRef.editStopByItem(item, '', false);
        });
        span.appendChild(saveIcon);
      }
    }

    return span;
  }
}
