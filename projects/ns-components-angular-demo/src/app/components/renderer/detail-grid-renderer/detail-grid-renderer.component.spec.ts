import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGridRendererComponent } from './detail-grid-renderer.component';

describe('DetailGridRendererComponent', () => {
  let component: DetailGridRendererComponent;
  let fixture: ComponentFixture<DetailGridRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailGridRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailGridRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
