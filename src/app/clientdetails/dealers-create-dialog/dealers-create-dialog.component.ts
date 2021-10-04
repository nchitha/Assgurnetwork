import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from './../../_services/common.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dealers-create-dialog',
  templateUrl: './dealers-create-dialog.component.html',
  styleUrls: ['./dealers-create-dialog.component.scss']
})
export class DealersCreateDialogComponent implements OnInit {
  dealerForm: FormGroup;
  bulkUpload = true;
  investors:any[] = [];
  constructor(private fb: FormBuilder, private commonService:CommonService, private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any) {
    if(data.mode =="add"){
      this.dealerForm = this.fb.group({
        dealer: ['', [Validators.required]],
        investors: ["", Validators.required],
        dealerCategory: ["", Validators.required],
        dealerCode: ["", Validators.required],
      });
    }else{
      this.bulkUpload = false;
      this.dealerForm = this.fb.group({
        dealer: [this.data.item.dealer_name, [Validators.required]],
        investors: [6, Validators.required],
        dealerCategory: [this.data.item.dealer_category, Validators.required],
        dealerCode: [this.data.item.dealer_code, Validators.required],
      });
    }
    
   }
  
  ngOnInit(): void {
    this.commonService.getInvestors().pipe(first()).subscribe(data  => {
      this.investors = data;
    });
  }

  isBulkUpload(istrue:boolean){
    this.bulkUpload = istrue;
  }

  onSubmitDealer() {
    if(this.data.mode =="add"){
      this.commonService.addDealer(this.dealerForm.value).subscribe((data:any) => {
        this.dealerForm.reset();
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
      }, (err:any) => {
      
      });
   }else{
    this.commonService.updateDealers(this.dealerForm.value,this.data.item.dealer_id).subscribe((data:any) => {
      this.dealerForm.reset();
      this._snackBar.open(data.message, 'Close',{
        duration: 3000,
        panelClass: ["greenAlert"]
      });
    }, (err:any) => {
    
    });
  }
  }

  onUpload(event: any) {
    this.commonService.uploadDealers(event).subscribe((data:any) => {
      this._snackBar.open(data.message, 'Close',{
        duration: 3000,
        panelClass: ["greenAlert"]
      });
  }, (err:any) => {
  
  });
  }

}
