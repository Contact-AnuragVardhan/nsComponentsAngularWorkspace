import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupingGridDemoComponent } from './grouping-grid-demo.component';

describe('GroupingGridDemoComponent', () => {
  let component: GroupingGridDemoComponent;
  let fixture: ComponentFixture<GroupingGridDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupingGridDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupingGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
