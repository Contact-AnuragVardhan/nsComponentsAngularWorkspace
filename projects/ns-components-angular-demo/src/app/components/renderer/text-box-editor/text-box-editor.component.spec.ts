import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBoxEditorComponent } from './text-box-editor.component';

describe('TextBoxEditorComponent', () => {
  let component: TextBoxEditorComponent;
  let fixture: ComponentFixture<TextBoxEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextBoxEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextBoxEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
