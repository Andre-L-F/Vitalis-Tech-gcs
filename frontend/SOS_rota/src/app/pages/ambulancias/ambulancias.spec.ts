import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ambulancias } from './ambulancias';

describe('Ambulancias', () => {
  let component: Ambulancias;
  let fixture: ComponentFixture<Ambulancias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ambulancias],
    }).compileComponents();

    fixture = TestBed.createComponent(Ambulancias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
