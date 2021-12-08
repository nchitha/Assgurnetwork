import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from './../../_services/common.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-outlets-create-dialog',
  templateUrl: './outlets-create-dialog.component.html',
  styleUrls: ['./outlets-create-dialog.component.scss']
})
export class OutletsCreateDialogComponent implements OnInit {
  outletForm: FormGroup;
  bulkUpload = true;
  dealers:any[] = [];
  constructor(private fb: FormBuilder, private commonService:CommonService, private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any) {
    if(data.mode =="add"){
      this.outletForm = this.fb.group({
        outlet: ['', [Validators.required]],
        dealers: ["", Validators.required],
        outletType: ["", Validators.required],
        city: ["", Validators.required],
        state: ["", Validators.required],
        zone :["", Validators.required],
        address :["", Validators.required],
      });
    }else{
      this.bulkUpload = false;
      this.outletForm = this.fb.group({
        outlet: [this.data.item.storeName, [Validators.required]],
        dealers: [this.data.item.dealerId, Validators.required],
        outletType: [this.data.item.storeTypeId, Validators.required],
        city: [this.data.item.city, Validators.required],
        state: [this.data.item.state, Validators.required],
        zone :[this.data.item.zone, Validators.required],
        address :[this.data.item.storeName, Validators.required],
      });
    }
    
   }
  
  ngOnInit(): void {
    this.commonService.getDealers().pipe(first()).subscribe(data  => {
      this.dealers = data;
    });
  }

  isBulkUpload(istrue:boolean){
    this.bulkUpload = istrue;
  }

  onSubmitOutlet() {
    if(this.data.mode =="add"){
      this.commonService.addOutlets(this.outletForm.value).subscribe((data:any) => {
        this.outletForm.reset();
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
      }, (err:any) => {
      
      });
   }else{
    this.commonService.editOutlet(this.outletForm.value,this.data.item.id).subscribe((data:any) => {
      this._snackBar.open(data.message, 'Close',{
        duration: 3000,
        panelClass: ["greenAlert"]
      });
    }, (err:any) => {
    
    });
  }
  }

  onUpload(event: any) {
    this.commonService.uploadOutlets(event).subscribe((data:any) => {
      this._snackBar.open(data.message, 'Close',{
        duration: 3000,
        panelClass: ["greenAlert"]
      });
  }, (err:any) => {
  
  });
  }

}
