import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserInterface } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.getRouteParams();
    this.initForm();
  }

  public submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: UserInterface = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe( () => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

  public back(): void {
    this.router.navigate(['']);
  }

  private getRouteParams(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Будь-ласка, введіть дані!';
      } else if (params.authFailed) {
        this.message = 'Сесія завершилась. Введіть дані ще раз!';
      }
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
}
