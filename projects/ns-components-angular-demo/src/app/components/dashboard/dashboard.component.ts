import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { GlobalContextService } from '../../service/global-context.service';
import { INSDashboardAngularSetting, INSDashboardPanelSetting, INSPanelToolBarDetails } from 'ns-components-angular';
import { AnimalComponent } from '../renderer/animal/animal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  setting!: INSDashboardAngularSetting;
  constructor(public globalContext: GlobalContextService) {

  }

  ngOnInit(): void {
    /*const { theme, oldTheme } = this.themeService.getTheme();
    this.theme = theme;
    this.oldTheme = oldTheme;*/
    this.setting = this.getSetting()
  }

  getSetting(): INSDashboardAngularSetting {
    const toolBarDetails: INSPanelToolBarDetails = {
      minimize: {  title: "Minimize" },
      maximize: {  title: "Maximize" },
      expand: {  title: "Expand" },
      collapse: { title: "Collapse" },
      fullScreen: { iconHTML: "<i class='icon-fullscreen icon-1' style='pointer-events: none;'></i>", title: "Click here for Full Screen" },
      restore: { iconHTML: "<i class='fa fa-window-restore fa-1'></i>", title: "Click here to Restore" },
      close: {  title: "Close" }
    };

    const setting: INSDashboardPanelSetting = {
      title: "Demo",
      titleHtml: "<i class='icon-move icon-1'></i>&nbsp;&nbsp;Demo",
      minWidth: 300,
      minHeight: 300,
      enablePopUp: false,
      enableModal: false,
      enableCollapse: true,
      enableMinimization: true,
      enableFullScreen: true,
      enableDrag: false,
      enableResize: true,
      enableTitleDblClick: false,
      enableMoveOnClick: false,
      customClass: {
        container: "panel",
        titleBar: "panelTitleBar",
        titleBarContent: "panelTitleBarContent",
        iconConatiner: null,
        icon: undefined,
        body: undefined
      },
      bodyComponent: AnimalComponent
    };

    const panelCount = 6;
    const arrSetting: INSDashboardPanelSetting[] = [];
    const objAnimal: any = { "0": { name: "dog" }, "1": { name: "cat" }, "2": { name: "goat" }, "3": { name: "sheep" }, "4": { name: "horse" }, "5": { name: "none" } };

    for (let count = 0; count < panelCount; count++) {
      arrSetting[count] = { ...setting };
      arrSetting[count].title = "Demo" + (count + 1);
      arrSetting[count].titleHtml = "<i class='icon-move icon-1'></i>&nbsp;&nbsp;Demo&nbsp;" + (count + 1);
      arrSetting[count].contentComponent = AnimalComponent;
      arrSetting[count].contentComponentData = objAnimal[count];
    }

    return {
      panelDragClass: "drag",
      panelCount: panelCount,
      panelPerRow: 3,
      arrPanelSetting: arrSetting
    };
  }
}
