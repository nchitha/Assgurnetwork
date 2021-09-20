import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
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
    private authService: AuthService) {
    this.login = this.fb.group({
      'username': ['', [Validators.required, Validators.maxLength(255)]],
      'password': ['', [Validators.required, Validators.maxLength(255)]]
    })
  }

  ngOnInit(){
  }

  loginSubmit() {
    this.authService.login(this.login.value).subscribe((data) => {
      this.router.navigate(['/app/dashboard']);
        console.log(data);

    }, (err:any) => {
      console.log("Login error", err);
    });
  }
}
