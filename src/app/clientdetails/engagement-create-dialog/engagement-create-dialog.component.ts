import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from './../../_services/common.service';

@Component({
  selector: 'app-engagement-create-dialog',
  templateUrl: './engagement-create-dialog.component.html',
  styleUrls: ['./engagement-create-dialog.component.scss']
})
export class EngagementCreateDialogComponent implements OnInit {

  versionDropdown: any[] = [{
      name: 'Version 1',
      value: 1
    },
    {
      name: 'Version 2',
      value: 2
    }
  ];
  isFileUploaded: boolean = false;
  isFileUploaded1: boolean = false;
  fileName: string = "";
  fileSize: string = "";
  fileName1: string = "";
  fileSize1: string = "";
  newOption: string = "";
  recuringInput: any;
  startDate: any;
  file: any;
  file1:any;

  engForm: FormGroup;

  constructor(private fb: FormBuilder, private commonService:CommonService, private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<EngagementCreateDialogComponent>) { 
    this.engForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      version: ['', Validators.required],
      salesCheck: ['', Validators.required],
      afterSalesCheck: ['']
    });
  }

  ngOnInit(): void {
    
  }

  allowDrop(event: any) {
    event.preventDefault();
  }
  onFileChange(event: any) {
    this.file = event.target.files.item(0);
    let file = event.target.files[0];
    this.fileName = file.name;
    this.fileSize = (file.size / 64).toFixed(2) + " KB";
    this.isFileUploaded = true;
  }
  onFileChange1(event: any) {
    this.file1 = event.target.files.item(0);
    let file = event.target.files[0];
    this.fileName1 = file.name;
    this.fileSize1 = (file.size / 64).toFixed(2) + " KB";
    this.isFileUploaded1 = true;
  }

  onSubmit(){
    console.log(this.engForm.value,this.file,this.file1);
    this.commonService.addEngagement(this.engForm.value,this.file,this.file1).subscribe((data:any) => {
      this._snackBar.open("Engagement added successfully", 'Close',{
        duration: 3000,
        panelClass: ["greenAlert"]
      });
      this.dialogRef.close('');
  }, (err:any) => {
  
  });
  }

}
