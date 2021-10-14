import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() page = '';
  roleId:any = 0;
  constructor(private router: Router,private commonService:CommonService) { }

  ngOnInit(): void {
    this.roleId = this.commonService.getUser()['roleId'];
  }

  profile(){
    this.router.navigate(['/app/dashboard/profile', {  }]);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login', {  }]);
  }
}
