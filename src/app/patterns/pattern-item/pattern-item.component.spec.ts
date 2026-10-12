import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatternItemComponent } from './pattern-item.component';

describe('PatternItemComponent', () => {
  let component: PatternItemComponent;
  let fixture: ComponentFixture<PatternItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatternItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
