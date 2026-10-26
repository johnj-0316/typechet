import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LucideSquareDashedPlus } from '@lucide/angular';
import { ActionComponent } from './action.component';

describe('ActionComponent', () => {
    let component: ActionComponent;
    let fixture: ComponentFixture<ActionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ActionComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(ActionComponent);
        fixture.componentRef.setInput('label', 'Create new pattern');
        fixture.componentRef.setInput('icon', LucideSquareDashedPlus.icon);
        fixture.componentRef.setInput('action', () => {});
        fixture.componentRef.setInput('link', '/dashboard/patterns');
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
