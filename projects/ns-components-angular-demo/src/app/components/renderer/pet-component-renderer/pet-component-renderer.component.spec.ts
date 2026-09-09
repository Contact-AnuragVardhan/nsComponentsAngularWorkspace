import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetComponentRendererComponent } from './pet-component-renderer.component';

describe('PetComponentRendererComponent', () => {
  let component: PetComponentRendererComponent;
  let fixture: ComponentFixture<PetComponentRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetComponentRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetComponentRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
