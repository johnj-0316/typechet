import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TrackersResponse, TrackersService } from './trackers.service';

describe('TrackersService', () => {
    let service: TrackersService;
    let httpTesting: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(TrackersService);
        httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTesting.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get the authenticated user trackers', () => {
        const response: TrackersResponse = {
            message: 'Trackers retrieved.',
            data: [],
        };

        service.getTrackers().subscribe((result) => {
            expect(result).toEqual(response);
        });

        const request = httpTesting.expectOne('/api/v1/trackers');
        expect(request.request.method).toBe('GET');
        request.flush(response);
    });
});
