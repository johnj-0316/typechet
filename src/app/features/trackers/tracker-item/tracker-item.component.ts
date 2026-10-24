import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { LucidePencil, LucidePlay, LucideTrash2 } from '@lucide/angular';
import { LineProgressComponent } from '../../../shared/components/line-progress/line-progress.component';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { DropdownItemData } from '../../../shared/components/dropdown/dropdown-item.type';

@Component({
    imports: [LineProgressComponent, LucidePlay, DropdownComponent, DatePipe],
    selector: 'tc-tracker-item',
    styleUrl: './tracker-item.component.css',
    templateUrl: './tracker-item.component.html',
})
export class TrackerItemComponent {
    trackerTitle = input<string | null>();
    patternTitle = input<string | null>();
    date = input<string | Date | null>();
    index = input<number | null>();
    rows = input<string[] | null>();
    readonly menuItems: DropdownItemData[] = [
        { id: 'edit', label: 'Edit', icon: LucidePencil.icon },
        { id: 'delete', label: 'Delete', icon: LucideTrash2.icon, tone: 'danger' },
    ];
}
