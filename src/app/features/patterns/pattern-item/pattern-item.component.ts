import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucidePencil, LucideTrash2 } from '@lucide/angular';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { DropdownItemData } from '../../../shared/components/dropdown/dropdown-item.type';

@Component({
    imports: [DropdownComponent, RouterLink],
    selector: 'tc-pattern-item',
    styleUrl: './pattern-item.component.css',
    templateUrl: './pattern-item.component.html',
})
export class PatternItemComponent {
    readonly patternId = input.required<number>();
    readonly title = input.required<string>();
    readonly date = input.required<string | null>();
    readonly menuItems: DropdownItemData[] = [
        { id: 'edit', label: 'Edit', icon: LucidePencil.icon },
        { id: 'delete', label: 'Delete', icon: LucideTrash2.icon, tone: 'danger' },
    ];

    select(item: DropdownItemData) {
        alert(item.id);
    }
}
