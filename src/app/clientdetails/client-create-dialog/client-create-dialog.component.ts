import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from './../../_services/common.service';

@Component({
  selector: 'app-client-create-dialog',
  templateUrl: './client-create-dialog.component.html',
  styleUrls: ['./client-create-dialog.component.scss']
})
export class ClientCreateDialogComponent implements OnInit {
  investorForm: FormGroup;

  constructor(private fb: FormBuilder, private commonService:CommonService) {
    this.investorForm = this.fb.group({
      investor: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    
  }

  onSubmitInvestor() {
    this.commonService.addInvestor(this.investorForm.value).subscribe((data) => {
        console.log(data);

    }, (err:any) => {
    
    });
  }
  
}
