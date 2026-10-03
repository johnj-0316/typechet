import { Component } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { NavComponent } from '../nav/nav.component';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NavComponent, UserFormComponent, RouterLink],
  selector: 'tc-signin',
  styleUrl: './signin.component.css',
  templateUrl: './signin.component.html',
})
export class SigninComponent {}
