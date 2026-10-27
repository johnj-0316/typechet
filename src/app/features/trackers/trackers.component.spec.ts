import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TrackersService } from '../../services/trackers.service';
import { TrackersComponent } from './trackers.component';

describe('TrackersComponent', () => {
    let component: TrackersComponent;
    let fixture: ComponentFixture<TrackersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrackersComponent],
            providers: [
                {
                    provide: TrackersService,
                    useValue: { getTrackers: () => of({ message: 'Trackers loaded.', data: [] }) },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TrackersComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
