import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaOcorrencia } from './nova-ocorrencia';

describe('NovaOcorrencia', () => {
  let component: NovaOcorrencia;
  let fixture: ComponentFixture<NovaOcorrencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaOcorrencia],
    }).compileComponents();

    fixture = TestBed.createComponent(NovaOcorrencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
