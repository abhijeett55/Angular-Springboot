import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  error = false;
  isLoading = false;
  private subscription?: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.error = false;

    this.subscription = this.apiService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        
        if (res.status === 200 && res.userType === 'CUSTOMER') {
          this.apiService.storeToken(res.authToken, 'customer');
          this.router.navigate(['/home']);
        } else if (res.status === 200 && res.userType === 'ADMIN') {
          this.apiService.storeToken(res.authToken, 'admin');
          this.router.navigate(['/admin']);
        } else {
          
          this.error = true;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = true;
        console.error('Login failed', err);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}