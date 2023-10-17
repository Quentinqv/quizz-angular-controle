import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', Validators.required),
    }, { validators: this.checkPasswords });
  }

  addUser() {
    if (this.registerForm.invalid) return;
    this.authService.addUser({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    });
    this.router.navigate(['/login']);
  }

  private checkPasswords(control: FormGroup) {
    const username = control.get('username');
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ missMatch: true });
      return { missMatch: true };
    }

    if (password?.value.includes(username?.value)) {
      password?.setErrors({ usernameInPassword: true });
      return { usernameInPassword: true };
    }

    return null;
  }

  get getErrorLabel() {
    if (this.registerForm.errors?.['required']) return 'Les champs sont obligatoires';
    if (!!this.registerForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimal pour votre mot de passe est ${this.registerForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    if (this.registerForm.errors?.['missMatch']) return 'Les mots de passe ne correspondent pas';
    if (this.registerForm.errors?.['usernameInPassword']) return 'Votre mot de passe ne doit pas contenir votre nom d\'utilisateur';
    return 'Un problème est survenu';
  }
}
