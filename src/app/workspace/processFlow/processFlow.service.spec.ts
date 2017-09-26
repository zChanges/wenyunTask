/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcessFlowService } from './processFlow.service';

describe('Service: ProcessFlow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessFlowService]
    });
  });

  it('should ...', inject([ProcessFlowService], (service: ProcessFlowService) => {
    expect(service).toBeTruthy();
  }));
});