import { LucidePalette, LucideUserRound, LucideUsersRound } from '@lucide/angular';
import { NavItem } from '../nav/nav.type';

export const dashboardItems: NavItem[] = [
    {
        label: 'Feedback',
        kind: 'link',
        path: '',
    },
    {
        label: 'Friends',
        kind: 'button',
        icon: LucideUsersRound.icon,
        action: () => {}
    },
    {
        label: 'Design',
        kind: 'button',
        icon: LucidePalette.icon,
        action: () => {}
    },
    {
        label: 'Account Details',
        kind: 'button',
        icon: LucideUserRound.icon,
        action: () => {}
    },
];
