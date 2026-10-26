import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PatternItemComponent } from './pattern-item.component';

describe('PatternItemComponent', () => {
    let component: PatternItemComponent;
    let fixture: ComponentFixture<PatternItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatternItemComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(PatternItemComponent);
        fixture.componentRef.setInput('patternId', 1);
        fixture.componentRef.setInput('title', 'Test Pattern');
        fixture.componentRef.setInput('date', 'January 1, 2026');
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
