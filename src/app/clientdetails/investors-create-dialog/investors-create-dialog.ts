import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from './../../_services/common.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-investors-create-dialog',
  templateUrl: './investors-create-dialog.component.html',
  styleUrls: ['./investors-create-dialog.component.scss']
})
export class InvestorsCreateDialogComponent implements OnInit {
  investorForm: FormGroup;
  bulkUpload = true;
  constructor(private fb: FormBuilder, private commonService:CommonService, private _snackBar: MatSnackBar) {
    this.investorForm = this.fb.group({
      investor: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    
  }

  isBulkUpload(istrue:boolean){
    this.bulkUpload = istrue;
  }

  onSubmitInvestor() {
    this.commonService.addInvestor(this.investorForm.value).subscribe((data:any) => {
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });

    }, (err:any) => {
    
    });
  }

  onUpload(event: any) {
    this.commonService.uploadInvestors(event).subscribe((data:any) => {
      this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });

  }, (err:any) => {
  
  });
  }
  
}
