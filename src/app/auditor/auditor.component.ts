import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from '../_services/audit.service';

@Component({
  selector: 'app-auditor',
  templateUrl: './auditor.component.html',
  styleUrls: ['./auditor.component.scss']
})
export class AuditorComponent implements OnInit {
  datas:any = [];
  headActive = 1;
  constructor(private router: Router,private auditService:AuditService) { }

  ngOnInit(): void {
    this.getCards("NEW",1);
  }

  onSelectAuditList(aud:any) {
    if(this.headActive == 1 || this.headActive == 2){
      this.router.navigate(['/app/auditor/ques'], { queryParams: { 'eng_id':aud.engagementId, 'storeId':aud.storeId,'store_name': aud.storeName} });

      // this.router.navigate(['/app/auditor/ques'], { queryParams: { 'auditId': aud.audit_pkId, 'clientId': aud.client_pkId, 'engId': aud.client_engagement_pkid, 'storeId': aud.store_pkid, 'storeType': aud.store_type_name } });
    }else{
      this.router.navigate(['/app/auditor/dealer-review'], { queryParams: { 'auditId': aud.audit_pkId, 'clientId': aud.client_pkId, 'engId': aud.client_engagement_pkid, 'storeId': aud.store_pkid, 'storeType': aud.store_type_name } });
    }
    
  }

  getCards(status,num){
    this.headActive = num;
    this.auditService.fetchAudit(status).subscribe((data:any) => {
      console.log("Tasks: ", data);
      this.datas = data;
    });
  }

}
