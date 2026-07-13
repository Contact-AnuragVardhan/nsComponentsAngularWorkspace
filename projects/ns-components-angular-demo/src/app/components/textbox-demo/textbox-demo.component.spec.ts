import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxDemoComponent } from './textbox-demo.component';

describe('TextboxDemoComponent', () => {
  let component: TextboxDemoComponent;
  let fixture: ComponentFixture<TextboxDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextboxDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextboxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
