import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { NSMultiSelectDropdownAngular, INSMultiSelectDropdownSetting } from 'ns-components-angular';
import { GlobalContextService } from '../../service/global-context.service';

interface IState {
  name: string;
  abbreviation: string;
}

@Component({
  selector: 'app-multi-select-dropdown',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.scss'
})
export class MultiSelectDropdownComponent implements OnInit {
  @ViewChild('nsDropdownSimple') nsDropdownSimple!: NSMultiSelectDropdownAngular;
  @ViewChild('nsDropdownVirtual') nsDropdownVirtual!: NSMultiSelectDropdownAngular;
  @ViewChild('nsDropdownHorizontal') nsDropdownHorizontal!: NSMultiSelectDropdownAngular;
  @ViewChild('nsDropdownVertical') nsDropdownVertical!: NSMultiSelectDropdownAngular;
  @ViewChild('nsDropdownMaxItems') nsDropdownMaxItems!: NSMultiSelectDropdownAngular;
  @ViewChild('nsDropdownCustomLabel') nsDropdownCustomLabel!: NSMultiSelectDropdownAngular;

  virtualSource: any[] = [];
  horizontalSource: any[] = [];
  verticalSource: any[] = [];
  maxItemsSource: any[] = [];
  customLabelSource: any[] = [];

  selectedMaxItems = 5;
  selectedStates: IState[] | null = null;
  states: IState[] = [
    { name: 'ALABAMA', abbreviation: 'AL' },
    { name: 'ALASKA', abbreviation: 'AK' },
    { name: 'ARIZONA', abbreviation: 'AZ' },
    { name: 'ARKANSAS', abbreviation: 'AR' },
    { name: 'CALIFORNIA', abbreviation: 'CA' },
    { name: 'COLORADO', abbreviation: 'CO' },
    { name: 'CONNECTICUT', abbreviation: 'CT' },
    { name: 'DELAWARE', abbreviation: 'DE' },
    { name: 'FLORIDA', abbreviation: 'FL' },
    { name: 'GEORGIA', abbreviation: 'GA' },
    { name: 'HAWAII', abbreviation: 'HI' },
    { name: 'IDAHO', abbreviation: 'ID' },
    { name: 'ILLINOIS', abbreviation: 'IL' },
    { name: 'INDIANA', abbreviation: 'IN' },
    { name: 'IOWA', abbreviation: 'IA' },
    { name: 'KANSAS', abbreviation: 'KS' },
    { name: 'KENTUCKY', abbreviation: 'KY' },
    { name: 'LOUISIANA', abbreviation: 'LA' },
    { name: 'MAINE', abbreviation: 'ME' },
    { name: 'MARYLAND', abbreviation: 'MD' },
    { name: 'MASSACHUSETTS', abbreviation: 'MA' },
    { name: 'MICHIGAN', abbreviation: 'MI' },
    { name: 'MINNESOTA', abbreviation: 'MN' },
    { name: 'MISSISSIPPI', abbreviation: 'MS' },
    { name: 'MISSOURI', abbreviation: 'MO' },
    { name: 'MONTANA', abbreviation: 'MT' },
    { name: 'NEBRASKA', abbreviation: 'NE' },
    { name: 'NEVADA', abbreviation: 'NV' },
    { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
    { name: 'NEW JERSEY', abbreviation: 'NJ' },
    { name: 'NEW MEXICO', abbreviation: 'NM' },
    { name: 'NEW YORK', abbreviation: 'NY' },
    { name: 'NORTH CAROLINA', abbreviation: 'NC' },
    { name: 'NORTH DAKOTA', abbreviation: 'ND' },
    { name: 'OHIO', abbreviation: 'OH' },
    { name: 'OKLAHOMA', abbreviation: 'OK' },
    { name: 'OREGON', abbreviation: 'OR' },
    { name: 'PENNSYLVANIA', abbreviation: 'PA' },
    { name: 'RHODE ISLAND', abbreviation: 'RI' },
    { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
    { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
    { name: 'TENNESSEE', abbreviation: 'TN' },
    { name: 'TEXAS', abbreviation: 'TX' },
    { name: 'UTAH', abbreviation: 'UT' },
    { name: 'VERMONT', abbreviation: 'VT' },
    { name: 'VIRGINIA', abbreviation: 'VA' },
    { name: 'WASHINGTON', abbreviation: 'WA' },
    { name: 'WEST VIRGINIA', abbreviation: 'WV' },
    { name: 'WISCONSIN', abbreviation: 'WI' },
    { name: 'WYOMING', abbreviation: 'WY' }
  ];

  constructor(public globalContext: GlobalContextService) {

  }

  ngOnInit(): void {
    this.simpleUsage();
    this.virtualList();
    this.labelHorizontalList();
    this.labelVerticalList();
    this.labelMaxItems();
    this.customLabelPosTop();
  }

  getMultiSelectSetting(type: string): INSMultiSelectDropdownSetting {
    switch (type) {
      case "simple":
        return this.getSetting('name');
      case "virtual":
        return this.getSetting('label', 'Select Item(s)',{enableVirtualScroll:true});
      case "horizontal":
        return this.getSetting('name', 'Select State(s)',
            {labelType: NSMultiSelectDropdownAngular.LABEL_TYPE_HORIZONTAL_LIST})
      case "vertical":
        return this.getSetting('name', 'Select State(s)',
            {labelType: NSMultiSelectDropdownAngular.LABEL_TYPE_VERTICAL_LIST})
      case "maxItems":
        return this.getSetting('name', 'Select State(s)',
            {labelType: NSMultiSelectDropdownAngular.LABEL_TYPE_VERTICAL_LIST, 
              itemAllowedToBeSelected: this.selectedMaxItems});
      case "customLabel":
        return this.getSetting('name', 'Select State(s)',{labelRenderer: this.labelRenderer.bind(this),
            showDropDownIcon: false,position:'top'});
    }
    return this.getSetting('name');
  }

  getSetting(labelField: string, placeHolder: string = 'Search State(s)', otherProps: INSMultiSelectDropdownSetting = {}): INSMultiSelectDropdownSetting {
    return {
      labelField,
      listWidth: '500px',
      listHeight: '400px',
      placeHolder,
      ...otherProps
    };
  }

  simpleUsage(): void {
    // Set dataSource if needed
  }

  virtualList(): void {
    const source = Array.from({ length: 10000 }, (_, i) => ({ label: `Item ${i + 1}`, index: i }));
    //this.nsDropdownVirtual?.setDataSource(source);
    this.virtualSource = source;
  }

  labelHorizontalList(): void {
    //this.nsDropdownHorizontal?.setDataSource(this.states);
    this.horizontalSource = this.states;
  }

  labelVerticalList(): void {
    //this.nsDropdownVertical?.setDataSource(this.states);
    this.verticalSource = this.states;
  }

  labelMaxItems(): void {
    //this.nsDropdownMaxItems?.setDataSource(this.states);
    this.maxItemsSource = this.states;
  };

  customLabelPosTop(): void {
    //this.nsDropdownCustomLabel?.setDataSource(this.states);
    this.customLabelSource = this.states;
  }

  handleMaxItemsChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedMaxItems = parseInt(value, 10);
    //this.nsDropdownMaxItems?.setDataSource(this.states);
    this.maxItemsSource = this.states;
  }

  selectValue(): void {
    const values = [
      { name: 'MICHIGAN', abbreviation: 'MI' },
      { name: 'NEW JERSEY', abbreviation: 'NJ' }
    ];
    this.selectedStates = [...values];
  }

  changeHandler(event: any, dropdown: NSMultiSelectDropdownAngular): void {
    const selectedItems = dropdown.getSelectedItems();
    console.log('Selected Items:', selectedItems);
  }

  labelRenderer(arrItems: any[], arrIndexes: number[], arrTexts: string[], labelField: string): HTMLElement | string {
    if (arrItems && arrItems.length > 0) {
      const ul = document.createElement("ul");
      ul.classList.add("listCon");
      for (let count = 0; count < arrItems.length; count++) {
        const item = arrItems[count];
        const index = arrIndexes[count];
        const li = document.createElement("li");
        const div = document.createElement('div');
        div.classList.add("text");
        div.appendChild(document.createTextNode(arrTexts[count]));
        li.appendChild(div);
        const span = document.createElement("span");
        span.classList.add("close");
        span.innerHTML = "&times;";
        span.setAttribute("data-index", '' + index);
        span.addEventListener("click", (event: MouseEvent) => {
          this.closeItem(item, index, event);
        });
        li.appendChild(span);
        ul.appendChild(li);
      }
      return ul;
    }
    return "";
  }


  closeItem(item: any, index: number, event: MouseEvent) {
    console.log(item, index);
    this.nsDropdownCustomLabel.setSelectUnselectItems(item, false);
    event.stopPropagation();
  };
}
