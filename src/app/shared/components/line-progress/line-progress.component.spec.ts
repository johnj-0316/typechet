import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineProgressComponent } from './line-progress.component';

describe('LineProgressComponent', () => {
    let component: LineProgressComponent;
    let fixture: ComponentFixture<LineProgressComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LineProgressComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LineProgressComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
