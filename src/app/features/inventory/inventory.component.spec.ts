import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { InventoryService } from '../../services/inventory.service';
import { InventoryComponent } from './inventory.component';

describe('InventoryComponent', () => {
    let component: InventoryComponent;
    let fixture: ComponentFixture<InventoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InventoryComponent],
            providers: [
                {
                    provide: InventoryService,
                    useValue: {
                        getInventory: () => of({ message: 'Inventory loaded.', data: [] }),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(InventoryComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
