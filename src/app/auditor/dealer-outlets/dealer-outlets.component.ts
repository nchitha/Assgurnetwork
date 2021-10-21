import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealer-outlets',
  templateUrl: './dealer-outlets.component.html',
  styleUrls: ['./dealer-outlets.component.scss']
})
export class DealerOutletsComponent implements OnInit {
  datas:any = JSON.parse('[{"status":"saved","audit_pkId":472,"audit_name":"","store_name":"Audi Secunderabad - Workshop","store_pkid":23,"store_city_name":"Secunderabad","zone":"South","dueDate":"2021-09-24T00:00:00.000+00:00","client_pkId":1,"stateName":"Telengana","mystry_shopper":"audiReviewer2@pwc.com","client_engagement_pkid":46,"client_name":"Audi","store_type_id":2,"store_type_name":"Workshop"}]');
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSelectAuditList(aud:any) {
    this.router.navigate(['/app/auditor/dealer-review'], { queryParams: { 'auditId': aud.audit_pkId, 'clientId': aud.client_pkId, 'engId': aud.client_engagement_pkid, 'storeId': aud.store_pkid, 'storeType': aud.store_type_name } });
  }

}
