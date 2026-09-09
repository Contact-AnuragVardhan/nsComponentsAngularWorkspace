import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionEvaluatorComponent } from './expression-evaluator.component';

describe('ExpressionEvaluatorComponent', () => {
  let component: ExpressionEvaluatorComponent;
  let fixture: ComponentFixture<ExpressionEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressionEvaluatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpressionEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
