import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { INSDatePickerAngularSetting, INSDatePickerCustomClass, NSDatePickerAngular } from 'ns-components-angular';
import { GlobalContextService } from '../../service/global-context.service';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent implements OnInit {
  selectedDate: string | null = null;

  @ViewChild('calSimple') calSimple!: NSDatePickerAngular;
  @ViewChild('calMinMax') calMinMax!: NSDatePickerAngular;
  @ViewChild('calDisabled') calDisabled!: NSDatePickerAngular;
  @ViewChild('calDisabledTextBox') calDisabledTextBox!: NSDatePickerAngular;
  @ViewChild('calCustomButton') calCustomButton!: NSDatePickerAngular;
  @ViewChild('calFooter') calFooter!: NSDatePickerAngular;
  @ViewChild('calFooterTimeZone') calFooterTimeZone!: NSDatePickerAngular;
  @ViewChild('calModel') calModel!: NSDatePickerAngular;

  arrTimezone = [
    { name: "(GMT -12:00) Eniwetok, Kwajalein", value: "-12:00" },
    { name: "(GMT -11:00) Midway Island, Samoa", value: "-11:00" },
    { name: "(GMT -10:00) Hawaii", value: "-10:00" },
    { name: "(GMT -9:30) Taiohae", value: "-09:50" },
    { name: "(GMT -9:00) Alaska", value: "-09:00" },
    { name: "(GMT -8:00) Pacific Time (US &amp; Canada)", value: "-08:00" },
    { name: "(GMT -7:00) Mountain Time (US &amp; Canada)", value: "-07:00" },
    { name: "(GMT -6:00) Central Time (US &amp; Canada), Mexico City", value: "-06:00" },
    { name: "(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima", value: "-05:00" },
    { name: "(GMT -4:30) Caracas", value: "-04:50" },
    { name: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz", value: "-04:00" },
    { name: "(GMT -3:30) Newfoundland", value: "-03:50" },
    { name: "(GMT -3:00) Brazil, Buenos Aires, Georgetown", value: "-03:00" },
    { name: "(GMT -2:00) Mid-Atlantic", value: "-02:00" },
    { name: "(GMT -1:00) Azores, Cape Verde Islands", value: "-01:00", selected: true },
    { name: "(GMT) Western Europe Time, London, Lisbon, Casablanca", value: "+00:00" },
    { name: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris", value: "+01:00" },
    { name: "(GMT +2:00) Kaliningrad, South Africa", value: "+02:00" },
    { name: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg", value: "+03:00" },
    { name: "(GMT +3:30) Tehran", value: "+03:50" },
    { name: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi", value: "+04:00" },
    { name: "(GMT +4:30) Kabul", value: "+04:50" },
    { name: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent", value: "+05:00" },
    { name: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi", value: "+05:50" },
    { name: "(GMT +5:45) Kathmandu, Pokhara", value: "+05:75" },
    { name: "(GMT +6:00) Almaty, Dhaka, Colombo", value: "+06:00" },
    { name: "(GMT +6:30) Yangon, Mandalay", value: "+06:50" },
    { name: "(GMT +7:00) Bangkok, Hanoi, Jakarta", value: "+07:00" },
    { name: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong", value: "+08:00" },
    { name: "(GMT +8:45) Eucla", value: "+08:75" },
    { name: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk", value: "+09:00" },
    { name: "(GMT +9:30) Adelaide, Darwin", value: "+09:50" },
    { name: "(GMT +10:00) Eastern Australia, Guam, Vladivostok", value: "+10:00" },
    { name: "(GMT +10:30) Lord Howe Island", value: "+10:50" },
    { name: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia", value: "+11:00" },
    { name: "(GMT +11:30) Norfolk Island", value: "+11:50" },
    { name: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka", value: "+12:00" },
    { name: "(GMT +12:45) Chatham Islands", value: "+12:75" },
    { name: "(GMT +13:00) Apia, Nukualofa", value: "+13:00" },
    { name: "(GMT +14:00) Line Islands, Tokelau", value: "+14:00" }
  ];

  cellStyle: { [key: string]: string } = {
    'display': 'flex',
    'flex-direction': 'column',
    'width': '33%'
  };

  customClass: INSDatePickerCustomClass = { textInput: "datePickerTextBox" };
  setting: INSDatePickerAngularSetting = { customClass: this.customClass };
  minMaxSetting: INSDatePickerAngularSetting = { inputDateFormat: "MM/dd/yyyy", minDate: "01/01/2021", maxDate: new Date(), selectedDate: new Date(), customClass: this.customClass };
  disabledSetting: INSDatePickerAngularSetting = { markDayDisabled: this.disabledDay, customClass: this.customClass };
  disabledTextBoxSetting: INSDatePickerAngularSetting = { enableTextBoxDisabled: true, customClass: this.customClass };
  customButtonSetting: INSDatePickerAngularSetting = { buttonHtml: "<i class='fa fa-calendar'></i>", placeHolder: "yyyy-mm-dd", dateOutputFormat: "yyyy-MM-dd", customClass: this.customClass };
  settingFooter: INSDatePickerAngularSetting = { showFooter: true, footerContent: this.getFooter(), customClass: this.customClass };
  timezoneSetting: INSDatePickerAngularSetting = { showFooter: true, footerContent: this.getTimezone(), calendarWidth: 300, customClass: this.customClass };
  timezoneModel: INSDatePickerAngularSetting = { calendarWidth: 300, customClass: this.customClass };

  modelDate: Date = new Date();


  constructor(public globalContext: GlobalContextService) {

  }

  ngOnInit(): void {
    this.themeChanged();
  }

  themeChanged(): void {
    // Implement theme change logic if applicable
  }

  dateSelected(type: string, destID: string, event: any): void {
    const div = document.querySelector("#" + destID);
    if (div) {
      div.innerHTML = event.detail;
    }
  }

  disabledDay(date: Date): boolean {
    const todayDate = new Date();
    return date < todayDate;
  }

  getFooter(): HTMLElement {
    const divFooter = document.createElement("div");
    divFooter.setAttribute("class", "calFooter");
    const span = document.createElement("span");
    span.setAttribute("class", "btn-group pull-left");

    const btnToday = document.createElement("button");
    btnToday.setAttribute("class", "btn btn-sm btn-info");
    btnToday.innerHTML = "Today";
    btnToday.onclick = () => this.calFooter.setTodayDate();
    span.appendChild(btnToday);

    const btnClear = document.createElement("button");
    btnClear.setAttribute("class", "btn btn-sm btn-danger");
    btnClear.innerHTML = "Clear";
    btnClear.onclick = () => this.calFooter.reset();
    span.appendChild(btnClear);

    const btnClose = document.createElement("button");
    btnClose.setAttribute("class", "btn btn-sm btn-success pull-right");
    btnClose.innerHTML = "Close";
    btnClose.onclick = () => this.calFooter.closeCalendar();
    span.appendChild(btnClose);

    divFooter.appendChild(span);
    return divFooter;
  }

  getTimezone(): HTMLElement {
    const divFooter = document.createElement("div");
    divFooter.setAttribute("class", "calFooter");
    const span = document.createElement("span");
    span.setAttribute("class", "btn-group pull-left");

    const btnToday = document.createElement("button");
    btnToday.setAttribute("class", "btn btn-sm btn-info");
    btnToday.innerHTML = "Today";
    btnToday.onclick = () => this.calFooterTimeZone.setTodayDate();
    span.appendChild(btnToday);

    const btnClear = document.createElement("button");
    btnClear.setAttribute("class", "btn btn-sm btn-danger");
    btnClear.innerHTML = "Clear";
    btnClear.onclick = () => this.calFooterTimeZone.reset();
    span.appendChild(btnClear);

    const select = document.createElement("select");
    select.style.width = "250px";
    this.arrTimezone.forEach(tz => {
      const option = document.createElement("option");
      option.text = tz.name;
      option.value = tz.value;
      select.appendChild(option);
    });
    span.appendChild(select);

    const btnClose = document.createElement("button");
    btnClose.setAttribute("class", "btn btn-sm btn-success pull-right");
    btnClose.innerHTML = "Close";
    btnClose.onclick = () => this.calFooterTimeZone.closeCalendar();
    span.appendChild(btnClose);

    divFooter.appendChild(span);
    return divFooter;
  }

  modelChange(event: any) {
    console.log(event);
  }

  selectValue(): void {
    this.selectedDate = '05/10/2024';
  }
}
