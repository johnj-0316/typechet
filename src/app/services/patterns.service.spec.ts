import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PatternResponse, PatternsService } from './patterns.service';

describe('PatternsService', () => {
  let service: PatternsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PatternsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get patterns available to the authenticated user', () => {
    const response: PatternResponse = {
      message: 'Patterns retrieved.',
      data: [],
    };

    service.getPatterns().subscribe((result) => {
      expect(result).toEqual(response);
    });

    const request = httpTesting.expectOne('/api/v1/patterns');
    expect(request.request.method).toBe('GET');
    request.flush(response);
  });
});
