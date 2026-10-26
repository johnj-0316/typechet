import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { SearchService } from '../../../services/search.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    const searchService = {
        search: vi.fn(() => of({ message: 'Search completed!', data: [] })),
    };

    beforeEach(async () => {
        vi.clearAllMocks();
        vi.stubGlobal('alert', vi.fn());

        await TestBed.configureTestingModule({
            imports: [SearchComponent],
            providers: [{ provide: SearchService, useValue: searchService }],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('searches when Enter is pressed', () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        input.value = 'crochet';
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

        expect(searchService.search).toHaveBeenCalledWith('crochet');
    });
});
