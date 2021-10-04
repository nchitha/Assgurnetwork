import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {
    this.login = this.fb.group({
      'username': ['', [Validators.required, Validators.maxLength(255)]],
      'password': ['', [Validators.required, Validators.maxLength(255)]]
    })
  }

  ngOnInit(){
  }

  loginSubmit() {
    this.authService.login(this.login.value).subscribe((data:any) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("clientId", data.clientId);
      localStorage.setItem("roleId", data.roleId);
      this.router.navigate(['/app/dashboard']);

    }, (err:any) => {
      this._snackBar.open(err.error.message, 'Close',{
        duration: 3000,
        panelClass: ["redAlert"]
      });
      console.log("Login error", err.error.message);
    });
  }
}
