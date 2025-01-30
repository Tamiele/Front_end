import { TestBed } from '@angular/core/testing';

import { HomePtService } from './home-pt.service';

describe('HomePtService', () => {
  let service: HomePtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
