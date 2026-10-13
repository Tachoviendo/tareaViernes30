import { TestBed } from '@angular/core/testing';
import { ErrorStore } from './error.service';

describe('ErrorStore', () => {
  let service: ErrorStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
