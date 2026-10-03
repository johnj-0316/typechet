import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'tc-user-form',
  styleUrl: './user-form.component.css',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  readonly buttonLabel = input.required<string>();
  readonly userForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });
}
