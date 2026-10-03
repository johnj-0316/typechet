import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'tc-user-form',
  styleUrl: './user-form.component.css',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  readonly router = inject(Router);
  readonly user = inject(UserService);
  readonly mode = input.required<"signin" | "signup">();
  readonly buttonLabel = input.required<string>();
  readonly userForm = new FormGroup({
    username: new FormControl("", {
      nonNullable: true
    }),
    email: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    })
  });

  ngOnInit() {
    const username = this.userForm.controls.username;

    if (this.mode() === "signup") {
      username.setValidators([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]);
    } else {
      username.clearValidators();
      username.setValue("");
    }

    username.updateValueAndValidity();
  }

  handleSubmit() {
    if (!this.userForm.valid)
      return;

    const { username, email, password } = this.userForm.getRawValue();
    let res: Observable<object>;

    if (this.mode() === "signin") {
      this.user.signin(email, password).subscribe({
        next: (res: any) => {
          localStorage.setItem("accessToken", res.auth.session.access_token);
          this.router.navigate(["/dashboard"]);
        },
        error: res => {
          alert(JSON.stringify(res));
        }
      });
    } 
    else {
      res = this.user.signup(username, email, password);
    }
  }
}
