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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ["", Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSubmitUser() {
    let user = 1;
    if(this.data.type == 'Admin'){
      user = 1;
    }else if(this.data.type == 'Auditor'){
      user = 2;
    }else if(this.data.type == 'Client User'){
      user = 3;
    }
    this.commonService.addUser(this.userForm.value,user).subscribe((data:any) => {
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
        this.userForm.reset();

    }, (err:any) => {
    
    });
  }

}
