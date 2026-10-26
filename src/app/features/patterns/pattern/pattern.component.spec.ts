import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Pattern } from '../../../shared/types/api.types';
import { PatternComponent } from './pattern.component';

describe('PatternComponent', () => {
    let component: PatternComponent;
    let fixture: ComponentFixture<PatternComponent>;

    const pattern: Pattern = {
        id: 1,
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-02'),
        authorId: null,
        urlId: null,
        rows: ['sc', 'dc'],
        title: 'Test Pattern',
        isEditing: false,
        description: 'A pattern used by the component test.',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatternComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(PatternComponent);
        fixture.componentRef.setInput('pattern', pattern);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('renders the resolved pattern', () => {
        expect(fixture.nativeElement.textContent).toContain('Test Pattern');
        expect(fixture.nativeElement.textContent).toContain('2');
    });
});
