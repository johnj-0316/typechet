import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { StitchesService } from '../../services/stitches.service';
import { StitchesComponent } from './stitches.component';

describe('StitchesComponent', () => {
    let component: StitchesComponent;
    let fixture: ComponentFixture<StitchesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StitchesComponent],
            providers: [
                {
                    provide: StitchesService,
                    useValue: { getStitches: () => of({ message: 'Stitches loaded.', data: [] }) },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(StitchesComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
