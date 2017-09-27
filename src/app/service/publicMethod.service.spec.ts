/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PublicMethodService } from './publicMethod.service';

describe('Service: PublicMethod', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicMethodService]
    });
  });

  it('should ...', inject([PublicMethodService], (service: PublicMethodService) => {
    expect(service).toBeTruthy();
  }));
});