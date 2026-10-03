import { Component } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  imports: [NavComponent, UserFormComponent],
  selector: 'tc-signup',
  styleUrl: './signup.component.css',
  templateUrl: './signup.component.html',
})
export class SignupComponent {}
