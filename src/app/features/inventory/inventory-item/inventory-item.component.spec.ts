import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryItemComponent } from './inventory-item.component';

describe('InventoryItemComponent', () => {
    let component: InventoryItemComponent;
    let fixture: ComponentFixture<InventoryItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InventoryItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InventoryItemComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('inventoryItem', {
            id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            item: 'Yarn',
            amount: 1,
            category: 'yarn',
            color: 'Blue',
            cost: null,
            urlId: null,
            authorId: 'user-id',
            amountUnit: 'skein',
            costUnit: null,
            colorHex: '#0000ff',
        });
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
