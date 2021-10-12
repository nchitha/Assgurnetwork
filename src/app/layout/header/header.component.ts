import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() page = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  profile(){
    this.router.navigate(['/app/dashboard/profile', {  }]);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login', {  }]);
  }
}
