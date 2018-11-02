import { Injectable,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Global } from '../globals/global';

@Injectable()
export class AuthenticationService{  // implements OnInit

private base_api_url:string;


  constructor(private http:HttpClient,private global: Global) { 
  	this.base_api_url=this.global.BASE_API_URL;

  }
  ngOnInit(){
  	this.global.IS_LOGGED_IN;
  }



  getUserDetails(username,password,emp_type){ 
  		
  	return this.http.post(this.base_api_url+'demo_login',{username,password,emp_type});

  }
  logout(){
  	localStorage.removeItem('key');
  }

}
