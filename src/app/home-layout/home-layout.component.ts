import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  sidebarType:string = "";
  page:string = "";

  constructor( private router:Router) { }

  ngOnInit(): void {
    let sub = this.router.url.split('/');
    this.page = sub[2];
    console.log(this.page);
    this.router.events
		.subscribe((event) => {
	    if (event instanceof NavigationEnd) {
			this.setSidebar(event.url.split('/')[2]);
	    }
	  });

  }

  setSidebar(url:any){
    this.page = url;
  }

}
