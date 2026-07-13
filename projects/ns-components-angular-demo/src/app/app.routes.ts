import { Routes } from '@angular/router';
import { TextboxDemoComponent } from './components/textbox-demo/textbox-demo.component';
import { MultiSelectDropdownComponent } from './components/multi-select-dropdown/multi-select-dropdown.component';
import { HomeComponent } from './components/home/home.component';
import { ExpressionEvaluatorComponent } from './components/expression-evaluator/expression-evaluator.component';
import { PanelComponent } from './components/panel/panel.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HierarchicalGridDemoComponent } from './components/hierarchical-grid-demo/hierarchical-grid-demo.component';
import { GroupingGridDemoComponent } from './components/grouping-grid-demo/grouping-grid-demo.component';
import { FlatGridDemoComponent } from './components/flat-grid-demo/flat-grid-demo.component';
import { RealTimeUpdatesComponent } from './components/real-time-updates/real-time-updates.component';
import { MasterDetailCustomGridDemoComponent } from './components/master-detail-custom-grid-demo/master-detail-custom-grid-demo.component';
import { NumericTextboxComponent } from './components/numeric-textbox/numeric-textbox.component';
import { TableRowMoverComponent } from './components/table-row-mover/table-row-mover.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
    { path: 'hierarchicalGrid', component: HierarchicalGridDemoComponent },
    { path: 'groupingGrid', component: GroupingGridDemoComponent },
    { path: 'flatGrid', component: FlatGridDemoComponent },
    { path: 'realTimeGrid', component: RealTimeUpdatesComponent },
    { path: 'masterDetail', component: MasterDetailCustomGridDemoComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'datePicker', component: DatePickerComponent},
    { path: 'panel', component: PanelComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'autocomplete', component: TextboxDemoComponent },
    { path: 'expressionEvaluator', component: ExpressionEvaluatorComponent },
    { path: 'multiSelectDropdown', component: MultiSelectDropdownComponent },
    { path: 'numericTextbox', component: NumericTextboxComponent },
    { path: 'tableRowMover', component: TableRowMoverComponent }
];