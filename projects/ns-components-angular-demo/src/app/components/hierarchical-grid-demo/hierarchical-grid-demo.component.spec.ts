import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchicalGridDemoComponent } from './hierarchical-grid-demo.component';

describe('HierarchicalGridDemoComponent', () => {
  let component: HierarchicalGridDemoComponent;
  let fixture: ComponentFixture<HierarchicalGridDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HierarchicalGridDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HierarchicalGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
