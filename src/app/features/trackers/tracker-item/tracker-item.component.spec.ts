import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackerItemComponent } from './tracker-item.component';

describe('TrackerItemComponent', () => {
    let component: TrackerItemComponent;
    let fixture: ComponentFixture<TrackerItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrackerItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TrackerItemComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
