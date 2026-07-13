import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowMoverComponent } from './table-row-mover.component';

describe('TableRowMoverComponent', () => {
  let component: TableRowMoverComponent;
  let fixture: ComponentFixture<TableRowMoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRowMoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRowMoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
