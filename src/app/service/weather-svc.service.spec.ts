import { TestBed } from '@angular/core/testing';

import { WeatherSvcService } from './weather-svc.service';

describe('WeatherSvcService', () => {
  let service: WeatherSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
