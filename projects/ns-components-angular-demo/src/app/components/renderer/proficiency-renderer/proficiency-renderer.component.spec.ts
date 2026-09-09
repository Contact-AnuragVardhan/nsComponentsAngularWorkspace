import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProficiencyRendererComponent } from './proficiency-renderer.component';

describe('ProficiencyRendererComponent', () => {
  let component: ProficiencyRendererComponent;
  let fixture: ComponentFixture<ProficiencyRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProficiencyRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProficiencyRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
