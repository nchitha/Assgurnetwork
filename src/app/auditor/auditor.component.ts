import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auditor',
  templateUrl: './auditor.component.html',
  styleUrls: ['./auditor.component.scss']
})
export class AuditorComponent implements OnInit {
  datas:any = JSON.parse('[{"status":"inprogress","audit_pkId":448,"audit_name":"","store_name":"Audi Visakhapatnam - Showroom","store_pkid":17,"store_city_name":"Visakhapatnam","zone":"South","dueDate":"2021-09-24T00:00:00.000+00:00","client_pkId":1,"stateName":"Andhra Pradesh","mystry_shopper":"audiReviewer2@pwc.com","client_engagement_pkid":46,"client_name":"Audi","store_type_id":1,"store_type_name":"Showroom"},{"status":"new","audit_pkId":447,"audit_name":"","store_name":"Audi Mumbai South - Showroom","store_pkid":72,"store_city_name":"Mumbai","zone":"West","dueDate":"2021-09-24T00:00:00.000+00:00","client_pkId":1,"stateName":"Maharashtra","mystry_shopper":"audiReviewer2@pwc.com","client_engagement_pkid":46,"client_name":"Audi","store_type_id":1,"store_type_name":"Showroom"},{"status":"new","audit_pkId":446,"audit_name":"","store_name":"Audi Madurai - Showroom","store_pkid":25,"store_city_name":"Madurai","zone":"South","dueDate":"2021-09-24T00:00:00.000+00:00","client_pkId":1,"stateName":"Tamil Nadu","mystry_shopper":"audiReviewer2@pwc.com","client_engagement_pkid":46,"client_name":"Audi","store_type_id":1,"store_type_name":"Showroom"},{"status":"new","audit_pkId":445,"audit_name":"","store_name":"Audi Bengaluru - Showroom","store_pkid":89,"store_city_name":"Bengaluru","zone":"South","dueDate":"2021-09-24T00:00:00.000+00:00","client_pkId":1,"stateName":"Karnataka","mystry_shopper":"audiReviewer2@pwc.com","client_engagement_pkid":46,"client_name":"Audi","store_type_id":1,"store_type_name":"Showroom"}]');
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSelectAuditList(aud:any) {
    this.router.navigate(['/app/auditor/ques'], { queryParams: { 'auditId': aud.audit_pkId, 'clientId': aud.client_pkId, 'engId': aud.client_engagement_pkid, 'storeId': aud.store_pkid, 'storeType': aud.store_type_name } });
  }

}
