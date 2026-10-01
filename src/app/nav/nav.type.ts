export type NavItem = {
    kind: 'link';
    label: string;
    path: string;
    class?: string;
}
| {
    kind: 'button';
    label: string;
    action: string;
    class?: string;
}
| {
    kind: 'search';
    label: string;
    class?: string;
};