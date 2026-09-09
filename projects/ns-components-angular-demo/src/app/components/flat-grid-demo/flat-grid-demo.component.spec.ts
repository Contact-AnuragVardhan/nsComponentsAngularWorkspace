import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatGridDemoComponent } from './flat-grid-demo.component';

describe('FlatGridDemoComponent', () => {
  let component: FlatGridDemoComponent;
  let fixture: ComponentFixture<FlatGridDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatGridDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlatGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
