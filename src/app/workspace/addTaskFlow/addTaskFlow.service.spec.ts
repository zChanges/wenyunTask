/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddTaskFlowService } from './addTaskFlow.service';

describe('Service: AddTaskFlow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddTaskFlowService]
    });
  });

  it('should ...', inject([AddTaskFlowService], (service: AddTaskFlowService) => {
    expect(service).toBeTruthy();
  }));
});