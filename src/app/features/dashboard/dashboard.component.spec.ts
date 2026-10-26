import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../shared/types/api.types';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    const profile: Profile = {
        id: 'd6405e2d-6374-45e9-8f4e-ebca16905d1a',
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-01'),
        name: 'crocheter',
        displayName: 'Yarn Fan',
        profileUrl: null,
        phone: null,
    };
    const profileService = {
        getUserProfile: () => of({ message: 'Found profile!', data: profile, user: profile }),
        editUserProfile: () => of({ message: 'Updated profile!', data: profile, user: profile }),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardComponent],
            providers: [provideRouter([]), { provide: ProfileService, useValue: profileService }],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
