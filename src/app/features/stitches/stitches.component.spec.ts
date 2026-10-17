import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StitchesComponent } from './stitches.component';

describe('StitchesComponent', () => {
    let component: StitchesComponent;
    let fixture: ComponentFixture<StitchesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StitchesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(StitchesComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
