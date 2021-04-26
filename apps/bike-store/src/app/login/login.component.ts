import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { slideInOutAnimation } from '../animations';
//import { AuthService } from '../auth/auth.service';
//import { AuthService } from '../../../../../libs/auth/src/lib/auth.service';
import { AuthService } from '@stores/auth';
import * as oktaConfig from '../okta.config';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [{ provide: 'oktaOptions', useValue: oktaConfig }],
  animations: [slideInOutAnimation],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loginInvalid: boolean;

  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/product';
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required],
    });

    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }
  }

  ngOnDestroy(): void {}

  async onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        await this.authService.login(username, password);
      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }
}
