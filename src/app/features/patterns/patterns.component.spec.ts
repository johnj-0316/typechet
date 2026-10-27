import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PatternsService } from '../../services/patterns.service';
import { PatternsComponent } from './patterns.component';

describe('PatternsComponent', () => {
    let component: PatternsComponent;
    let fixture: ComponentFixture<PatternsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatternsComponent],
            providers: [
                {
                    provide: PatternsService,
                    useValue: { getPatterns: () => of({ message: 'Patterns loaded.', data: [] }) },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PatternsComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
