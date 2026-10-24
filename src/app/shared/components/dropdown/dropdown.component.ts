import { Component, HostListener, OnDestroy, computed, input, output, signal } from '@angular/core';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { LucideEllipsisVertical } from '@lucide/angular';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { DropdownItemData } from './dropdown-item.type';

@Component({
    imports: [DropdownItemComponent, LucideEllipsisVertical, OverlayModule],
    selector: 'tc-dropdown',
    styleUrl: './dropdown.component.css',
    templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnDestroy {
    private static activeDropdown: DropdownComponent | null = null;

    readonly items = input.required<DropdownItemData[]>();
    readonly align = input<'start' | 'end'>('start');
    readonly itemSelected = output<DropdownItemData>();
    readonly open = signal(false);

    readonly positions = computed<ConnectedPosition[]>(() => {
        const preferredX = this.align();
        const fallbackX = preferredX === 'end' ? 'start' : 'end';

        return [
            this.position(preferredX, 'bottom'),
            this.position(preferredX, 'top'),
            this.position(fallbackX, 'bottom'),
            this.position(fallbackX, 'top'),
        ];
    });

    toggle(event: MouseEvent): void {
        event.stopPropagation();

        // if we toggle the same dropdown we have open close it
        if (this.open()) {
            this.close();
            return;
        }

        // otherwise, we close the currently open dropdown and set it the instance of the toggled one
        DropdownComponent.activeDropdown?.close();
        DropdownComponent.activeDropdown = this;
        this.open.set(true);
    }

    select(item: DropdownItemData): void {
        this.itemSelected.emit(item);
        this.close();
    }

    close(): void {
        this.open.set(false);

        if (DropdownComponent.activeDropdown === this) {
            DropdownComponent.activeDropdown = null;
        }
    }

    closeOnOutsideClick(): void {
        this.close();
    }

    @HostListener('document:keydown.escape')
    closeOnEscape(): void {
        this.close();
    }

    ngOnDestroy(): void {
        this.close();
    }

    private position(horizontal: 'start' | 'end', vertical: 'top' | 'bottom'): ConnectedPosition {
        const opensBelow = vertical === 'bottom';

        return {
            originX: horizontal,
            originY: vertical,
            overlayX: horizontal,
            overlayY: opensBelow ? 'top' : 'bottom',
        };
    }
}
