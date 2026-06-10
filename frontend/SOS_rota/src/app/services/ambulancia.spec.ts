import { TestBed } from '@angular/core/testing';

import { Ambulancia } from './ambulancia';

describe('Ambulancia', () => {
  let service: Ambulancia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ambulancia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
