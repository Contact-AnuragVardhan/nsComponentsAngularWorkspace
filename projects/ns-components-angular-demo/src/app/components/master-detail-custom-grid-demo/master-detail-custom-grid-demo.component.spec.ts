import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailCustomGridDemoComponent } from './master-detail-custom-grid-demo.component';

describe('MasterDetailCustomGridDemoComponent', () => {
  let component: MasterDetailCustomGridDemoComponent;
  let fixture: ComponentFixture<MasterDetailCustomGridDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterDetailCustomGridDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterDetailCustomGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
