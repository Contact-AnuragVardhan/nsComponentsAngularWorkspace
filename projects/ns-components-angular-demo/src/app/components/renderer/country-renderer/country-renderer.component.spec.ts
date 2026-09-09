import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryRendererComponent } from './country-renderer.component';

describe('CountryRendererComponent', () => {
  let component: CountryRendererComponent;
  let fixture: ComponentFixture<CountryRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
