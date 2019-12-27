import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  template: `
    <form [formGroup]="myform">
      <fieldset formGroupName="name">
        <div class="form-group"
            [ngClass]="{
            'has-danger': firstName.invalid && (firstName.dirty || firstName.touched),
            'has-success': firstName.valid && (firstName.dirty || firstName.touched)
          }">
          <label>First Name</label>
          <input 
            class="form-control" 
            type="text"
            formControlName="firstName"
            required>
          <div class="form-control-feedback"
           *ngIf="firstName.errors && (firstName.dirty || firstName.touched)">
          <p *ngIf="firstName.errors.required">First Name is required</p>
          </div>
        </div>
        
        <div class="form-group"
            [ngClass]="{
            'has-danger': lastName.invalid && (lastName.dirty || lastName.touched),
            'has-success': lastName.valid && (lastName.dirty || lastName.touched)
          }">
          <label>Last Name</label>
          <input 
            class="form-control" 
            type="text"
            formControlName="lastName"
            required>
          <div class="form-control-feedback"
           *ngIf="lastName.errors && (lastName.dirty || lastName.touched)">
          <p *ngIf="lastName.errors.required">Last Name is required</p>
          </div>
        </div>
      </fieldset>

      <div 
        class="form-group"
        [ngClass]="{
          'is-valid': email.valid && (email.dirty || email.touched),
          'is-invalid': email.invalid && (email.dirty || email.touched)
        }">
        <label>Email</label>
        <input 
          class="form-control" 
          type="email"
          formControlName="email"
          required>
        <div class="form-control-feedback"
         *ngIf="email.errors && (email.dirty || email.touched)">
          <p *ngIf="email.errors.required">Email is required</p>
          <p *ngIf="password.errors.pattern">The email address must contain at least the @ character</p>
        </div>
      </div>

      <div class="form-group"
          [ngClass]="{
            'is-invalid': password.invalid && (password.dirty || password.touched),
            'is-valid': password.valid && (password.dirty || password.touched)
          }">
        <label>Password</label>
        <input 
          class="form-control" 
          type="password"
          formControlName="password"
          required>
        <div class="form-control-feedback"
         *ngIf="password.errors && (password.dirty || password.touched)">
          <p *ngIf="password.errors.required">Password is required</p>
          <p *ngIf="password.errors.minlength">Password must be 8 characters long, we need another {{password.errors.minlength.requiredLength - password.errors.minlength.actualLength}} characters </p>
        </div>
      </div>

      <div class="form-group"
          [ngClass]="{
            'has-danger': language.invalid && (language.dirty || language.touched),
            'has-success': language.valid && (language.dirty || language.touched)
          }">
        <label>Language</label>
        <select class="form-control" formControlName="language">
          <option value="">Please select a language</option>
          <option *ngFor="let lang of langs" [value]="lang">{{ lang }}</option>
        </select>
      </div>
    </form>

    <pre>{{ myform.value | json }}</pre>
  `
})
export class ReactiveFormComponent implements OnInit {
  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;

  langs: string[] = ['English', 'French', 'German'];

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('',[
        Validators.required,
        Validators.pattern("[^@]*@[^@]*")
      ]);
    this.password = new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ]);
    this.language = new FormControl('');
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName
      }),
      email: this.email,
      password: this.password,
      language: this.language
    })
  }
}