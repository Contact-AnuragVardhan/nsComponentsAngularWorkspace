import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { RouterOutlet } from '@angular/router';
import { GlobalContextService } from '../../service/global-context.service';
import { INSNavigationAngularSettings, INSNavigationMenu, NSNavigationAngular } from 'ns-components-angular';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [SharedModule, RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  dataSource: INSNavigationMenu[] = [
    { menuName: "Home", href: "/home", iconBeforeHtml: "<i class='fa fa-home' aria-hidden='true'></i>", selected: true },
    {
      menuName: "Grid Demo", href: "#", iconBeforeHtml: "<i class='fa fa-table' aria-hidden='true'></i>", expanded: true, childMenus: [
        { menuName: "Hierarchical", href: "/hierarchicalGrid", iconBeforeHtml: "<i class='fa fa-list-alt' aria-hidden='true'></i>" },
        { menuName: "Grouping", href: "/groupingGrid", iconBeforeHtml: "<i class='fa fa-users' aria-hidden='true'></i>" },
        { menuName: "Flat", href: "/flatGrid", iconBeforeHtml: "<i class='fa fa-table' aria-hidden='true'></i>" },
        { menuName: "Real Time", href: "/realTimeGrid", iconBeforeHtml: "<i class='fa fa-random' aria-hidden='true'></i>" },
        { menuName: "Master Detail", href: "/masterDetail", iconBeforeHtml: "<i class='fa fa-random' aria-hidden='true'></i>" }
      ]
    },
    {
      menuName: "Calendar Demo", href: "#", iconBeforeHtml: "<i class='fa fa-calendar' aria-hidden='true'></i>", expanded: true, childMenus: [
        { menuName: "Calendar", href: "/calendar", iconBeforeHtml: "<i class='fa fa-calendar' aria-hidden='true'></i>" }
      ]
    },
    {
      menuName: "DatePicker Demo", href: "#", iconBeforeHtml: "<i class='fa fa-calendar' aria-hidden='true'></i>", expanded: true, childMenus: [
        { menuName: "DatePicker", href: "/datePicker", iconBeforeHtml: "<i class='fa fa-calendar' aria-hidden='true'></i>" }
      ]
    },
    {
      menuName: "Panel Demo", href: "#", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>", expanded: true, childMenus: [
        { menuName: "Panel", href: "/panel", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>" }
      ]
    },
    {
      menuName: "Dashboard Demo", href: "#", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>", expanded: true, childMenus: [
        { menuName: "Dashboard", href: "/dashboard", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>" }
      ]
    },
    {
      menuName: "Autocomplete Demo", href: "#", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>", expanded: true, childMenus: [
        { menuName: "Autocomplete", href: "/autocomplete", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>" }
      ]
    },
    {
      menuName: "Numeric Textbox Demo", href: "#", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>", expanded: true, childMenus: [
        { menuName: "Numeric Textbox", href: "/numericTextbox", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>" }
      ]
    },
    {
      menuName: "Table Row Mover Demo", href: "#", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>", expanded: true, childMenus: [
        { menuName: "Table Row Mover", href: "/tableRowMover", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>" }
      ]
    },
    {
      menuName: "Expression Evaluator Demo", href: "#", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>", expanded: true, childMenus: [
        { menuName: "Expression Evaluator", href: "/expressionEvaluator", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>" }
      ]
    },
    {
      menuName: "MultiSelect Dropdown Demo", href: "#", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>", expanded: true, childMenus: [
        { menuName: "MultiSelect Dropdown", href: "/multiSelectDropdown", iconBeforeHtml: "<i class='fa fa-tachometer' aria-hidden='true'></i>" }
      ]
    }
  ];

  initialize: boolean = false;

  navSetting: INSNavigationAngularSettings = {
    header: "NAVIGATION",
    showCollapseIcon: true,
    iconCollapse: "<i class='fa fa-bars pull-right'></i>",
    titleField: "menuName",
    childField: "childMenus",
    iconPosition: "right",
    iconMenuExpanded: "<i class='fa fa-angle-down'></i>",
    iconMenuCollapsed: "<i class='fa fa-angle-down expanded'></i>",
    collapseTopOffset: -10,
    routeType: "history"
  };

  selectedMenu: string = '';
  @ViewChild(NSNavigationAngular, { static: false }) nsNavigationRef!: NSNavigationAngular;
  @ViewChild('divContentRef', { static: false }) divContentRef!: ElementRef;

  constructor(
    public globalContext: GlobalContextService,
    //private themeService: ThemeService
  ) {

  }

  ngOnInit(): void {
    // Check if theme needs to be changed initially
    this.themeChanged();
  }

  ngAfterViewInit(): void {
    // Initialize navigation on view load if needed
    if (!this.initialize && this.nsNavigationRef) {
      this.handleNavigationEvent(null, "navigationOpenStart");
      this.setDataSourceAndTheme();
      this.initialize = true;
    }
  }

  private setDataSourceAndTheme() {
    //const theme = this.themeService.getCurrentTheme();
    if (this.nsNavigationRef) {
      this.nsNavigationRef.setDataSource(this.dataSource);
      //this.nsNavigationRef.setTheme(theme);
    }

    /*const contextRoute = this.globalContext.getRoute();
    if (contextRoute) {
      this.selectedMenu = contextRoute;
      this.globalContext.clearRoute();
    }*/
  }

  private toggleNavigation(): void {
    if (this.nsNavigationRef) {
      this.nsNavigationRef.toggleNavigation();
    }
  }

  themeChanged(): void {
    /*const { theme, oldTheme } = this.themeService;
    if (theme !== oldTheme) {
      const body = document.body;
      if (oldTheme) {
        body.classList.remove("nmPageBody" + oldTheme);
      }
      body.classList.add("nmPageBody" + theme);
      if (this.nsNavigationRef) {
        this.nsNavigationRef.setTheme(theme);
      }
    }*/
  }

  handleNavigationEvent(event: any, eventType: string): void {
    switch (eventType) {
      case "navigationOpenStart":
        if(this.divContentRef?.nativeElement) {
          this.divContentRef.nativeElement.style.marginLeft = "250px";
        }
        break;
      case "navigationCloseStart":
        if(this.divContentRef?.nativeElement) {
          this.divContentRef.nativeElement.style.marginLeft = "50px";
        }
        break;
      case "navigationMenuSelected":
        const item = event;
        if(item.link) {
          this.selectedMenu = item.link;
        }
        break;
      default:
        break;
    }
  }
}
