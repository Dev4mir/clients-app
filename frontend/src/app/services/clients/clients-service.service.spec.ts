import { TestBed, inject } from '@angular/core/testing';

import { ClientsServiceService } from './clients-service.service';

describe('ClientsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientsServiceService]
    });
  });

  it('should be created', inject([ClientsServiceService], (service: ClientsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
