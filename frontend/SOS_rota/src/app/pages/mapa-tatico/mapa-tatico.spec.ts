import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaTatico } from './mapa-tatico';

describe('MapaTatico', () => {
  let component: MapaTatico;
  let fixture: ComponentFixture<MapaTatico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaTatico],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaTatico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
