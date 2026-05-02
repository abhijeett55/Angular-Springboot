import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required],
      age: ['', Validators.required],
      usertype: ['customer']
    });
  }

  register(): void {
    this.subscription = this.apiService.register(this.registerForm.value).subscribe({
      next: (res) => {
        if (res && res.status === 400) {
          console.log("Details cannot be empty");
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        if (err.status === 400) {
          console.log("Bad request – likely validation error");
        } else {
          alert("An error has occurred, please try again!");
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}