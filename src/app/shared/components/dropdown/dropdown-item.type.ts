import { LucideIconData } from '@lucide/angular';

export type DropdownItemData = {
    id: string;
    label: string;
    icon?: LucideIconData;
    path?: string;
    disabled?: boolean;
    tone?: 'default' | 'danger';
};
