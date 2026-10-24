import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StitchItemComponent } from './stitch-item.component';

describe('StitchItemComponent', () => {
    let component: StitchItemComponent;
    let fixture: ComponentFixture<StitchItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StitchItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(StitchItemComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
