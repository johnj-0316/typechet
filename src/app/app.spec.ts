import { describe, expect, beforeEach, it, test } from "vitest";
import { TestBed } from '@angular/core/testing';
import { App } from './app';

import { GetColorName } from "hex-color-to-color-name";

describe.each([
  {
    input: "#FFFFFF",
    expected: "White",
  },
])("GetColorName($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const name = GetColorName(input);
    expect(name).toHaveLength(expected.length);
  });
});

// describe('App', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [App],
//     })
//       .compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(App);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it('should render title', async () => {
//     const fixture = TestBed.createComponent(App);
//     await fixture.whenStable();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('h1')?.textContent).toContain('Hello, crochet-counter');
//   });
// });
