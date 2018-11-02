import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import { AuthenticationService } from '../../_services/authentication.service';
 import { Global } from '../../globals/global';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(private auth: AuthenticationService,private router: Router,private global: Global) { }

  ngOnInit() {
  	if(this.global.IS_LOGGED_IN==true){
  		this.auth.logout();
  		this.router.navigate(['./signin']);
  	}
  }

}
