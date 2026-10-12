import { Component, computed, input } from '@angular/core';

@Component({
    imports: [],
    selector: 'tc-circle-progress',
    styleUrl: './circle-progress.component.css',
    templateUrl: './circle-progress.component.html',
})
export class CircleProgressComponent {
    value = input<number>(80);
    max = input<number>(100);
    size = input<number>(50);
    strokeWidth = input<number>(5);
    showText = input<boolean>(false);

    radius = computed(() => this.size() / 2 - this.strokeWidth());
    circumference = computed(() => 2 * Math.PI * this.radius());
    strokeDashoffset = computed(() => {
        const progress = Math.max(0, Math.min(this.value(), this.max()));
        const percentage = progress / this.max();

        return this.circumference() * (1 - percentage);
    });
}
