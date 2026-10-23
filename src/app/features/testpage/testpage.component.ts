import { Component } from '@angular/core';
import {
  LucideArrowRight,
  LucideBookOpen,
  LucideCalendarDays,
  LucideChevronRight,
  LucideCirclePlay,
  LucideClock3,
  LucidePackageOpen,
  LucidePlus,
  LucideScissors,
  LucideSparkles,
  LucideSpool,
  LucideTrendingUp,
} from '@lucide/angular';

@Component({
  imports: [
    LucideArrowRight,
    LucideBookOpen,
    LucideCalendarDays,
    LucideChevronRight,
    LucideCirclePlay,
    LucideClock3,
    LucidePackageOpen,
    LucidePlus,
    LucideScissors,
    LucideSparkles,
    LucideSpool,
    LucideTrendingUp,
  ],
  selector: 'tc-testpage',
  styleUrl: './testpage.component.css',
  templateUrl: './testpage.component.html',
})
export class TestpageComponent {
  readonly patterns = [
    { title: 'Cloud Cardigan', meta: '12 rows · edited today', color: '#d3768a' },
    { title: 'Market Tote', meta: '8 rows · edited Tue', color: '#8aa89e' },
    { title: 'Cozy Beanie', meta: '16 rows · edited Sep 28', color: '#c99a66' },
  ];

  readonly activity = [
    { day: 'M', value: 42 },
    { day: 'T', value: 68 },
    { day: 'W', value: 34 },
    { day: 'T', value: 82 },
    { day: 'F', value: 58 },
    { day: 'S', value: 92 },
    { day: 'S', value: 64 },
  ];
}
