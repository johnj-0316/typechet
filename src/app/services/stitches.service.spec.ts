import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { StitchesResponse, StitchesService } from './stitches.service';

describe('StitchesService', () => {
    let service: StitchesService;
    let httpTesting: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(StitchesService);
        httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTesting.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get stitches available to the authenticated user', () => {
        const response: StitchesResponse = {
            message: 'Stitches retrieved.',
            data: [],
        };

        service.getStitches().subscribe((result) => {
            expect(result).toEqual(response);
        });

        const request = httpTesting.expectOne('/api/v1/stitches');
        expect(request.request.method).toBe('GET');
        request.flush(response);
    });
});
