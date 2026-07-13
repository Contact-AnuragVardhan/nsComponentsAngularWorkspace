import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeRendererComponent } from './real-time-renderer.component';

describe('RealTimeRendererComponent', () => {
  let component: RealTimeRendererComponent;
  let fixture: ComponentFixture<RealTimeRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealTimeRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealTimeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
