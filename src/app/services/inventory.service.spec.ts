import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InventoryResponse, InventoryService } from './inventory.service';

describe('InventoryService', () => {
    let service: InventoryService;
    let httpTesting: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(InventoryService);
        httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTesting.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get the authenticated user inventory', () => {
        const response: InventoryResponse = {
            message: 'Inventory retrieved.',
            data: [],
        };

        service.getInventory().subscribe((result) => {
            expect(result).toEqual(response);
        });

        const request = httpTesting.expectOne('/api/v1/inventories');
        expect(request.request.method).toBe('GET');
        request.flush(response);
    });
});
