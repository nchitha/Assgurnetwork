import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from './../../_services/common.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.scss']
})
export class UserCreateDialogComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private commonService:CommonService, private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      emailid: ["", [Validators.required,Validators.email]],
      password: ["", Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSubmitUser(){

  }

}
