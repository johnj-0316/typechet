import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SearchResponse, SearchService } from './search.service';

describe('SearchService', () => {
    let service: SearchService;
    let httpTesting: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(SearchService);
        httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTesting.verify();
    });

    it('searches with the supplied query and limit', () => {
        const response: SearchResponse = {
            message: 'Search completed!',
            data: [],
        };

        service.search('crochet', 5).subscribe((result) => {
            expect(result).toEqual(response);
        });

        const request = httpTesting.expectOne(
            (candidate) =>
                candidate.url === '/api/v1/search' &&
                candidate.params.get('q') === 'crochet' &&
                candidate.params.get('limit') === '5',
        );
        expect(request.request.method).toBe('GET');
        request.flush(response);
    });
});
