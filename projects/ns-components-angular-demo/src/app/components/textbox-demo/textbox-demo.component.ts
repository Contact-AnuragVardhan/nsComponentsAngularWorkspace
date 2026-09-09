import { Component, ViewChild } from '@angular/core';
import { INSGridColumn, INSTextBoxAngularSetting, NSComponentsModule, NSTextBoxAngular } from 'ns-components-angular';
import { fetchCountriesWithText } from '../../util/countryApi';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-textbox-demo',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './textbox-demo.component.html',
  styleUrl: './textbox-demo.component.scss'
})
export class TextboxDemoComponent {
  @ViewChild('textBoxRef', { static: false }) textBoxRef: NSTextBoxAngular | null = null;
  selectedTextBoxItemRef: any = null;
  textBoxSetting: INSTextBoxAngularSetting | null = null;

  private readonly LABEL_FIELD = 'name';
  private readonly SEARCH_FIELD = ['name', 'code'];

  dataSource: any[] = [];

  ngOnInit(): void {
    this.setTextBoxSetting();
    //this.themeService.themeChanged.subscribe(() => this.themeChanged());
  }

  /*private themeChanged(): void {
    if (this.themeService.theme !== this.themeService.oldTheme) {
      this.textBoxRef?.setTheme(this.themeService.theme);
    }
  }*/

  private setTextBoxSetting(): void {
    if (!this.textBoxSetting) {
      let columns: INSGridColumn[] = [
        { headerText: 'Country', dataField: 'name', width: '140px' },
        { headerText: 'Code', code: 'code', width: '140px' }
      ];
      let dropDownSetting = {
        columns: columns,
        enableVirtualScroll: true,
        enableFilter: true,
        enableAdvancedFilter: true,
        enablePagination: false
      };
      let filterSetting = {
        caseSensitive: false,
        multiline: false,
        matchType: NSTextBoxAngular.FILTER_TYPE_CONTAINS
      };
      this.textBoxSetting = {
        enableServerWithSmartSearch: true,
        placeholder: 'Search Country...',
        type: 'autocomplete',
        dropDownType: NSTextBoxAngular.DROPDOWN_TYPE_GRID,
        listWidth: 700,
        required: true,
        labelField: this.LABEL_FIELD,
        minSearchStartChars: 3,
        enableMultipleSelection: false,
        enableKeyboardNavigation: true,
        stopHoveringField: 'stopOver',
        dropDownSetting: dropDownSetting,
        filterSetting: filterSetting,
        enableHighlighting: true,
        isGridOrFilter: true,
        arrGridSearchField: this.SEARCH_FIELD,
        serverSearchCallback: this.fetchCountryList.bind(this),
        textBoxRendererCallback: this.textBoxRenderer.bind(this)
      };
    }
  }

  private fetchCountryList(searchText: string): void {
    fetchCountriesWithText(searchText).then(data => {
      /*if (this.textBoxRef) {
        this.textBoxRef.dataSource = data;
      }*/
     this.dataSource = data;
    }).catch(err => console.log(err));
  }

  private textBoxRenderer(item: any, labelField: string): string {
    if (item) {
      this.selectedTextBoxItemRef = item;
      /*if (this.textBoxRef) {
        this.textBoxRef.dataSource = [];
      }*/
     this.dataSource = [];
      return item[labelField];
    } else {
      this.selectedTextBoxItemRef = null;
      return '';
    }
  }
}
