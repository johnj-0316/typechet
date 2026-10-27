import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DropdownItemComponent } from './dropdown-item.component';

describe('DropdownItemComponent', () => {
    let component: DropdownItemComponent;
    let fixture: ComponentFixture<DropdownItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DropdownItemComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(DropdownItemComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('data', { id: 'edit', label: 'Edit' });
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
