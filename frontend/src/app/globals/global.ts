import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()

export class Global{
	private base_api_url:string;

	constructor(private router:Router) {

		this.base_api_url='http://localhost/hris/index.php/api/';
	 }

	get BASE_API_URL(){ return this.base_api_url; }

	get IS_LOGGED_IN(){
		if (localStorage.length > 0) {
	  	 	return true;
		} 
		else{
				this.router.navigate(['./signin']);
		}
	}

	get IS_LOGGED_IN_CLIENT(){
		var a =JSON.parse(localStorage.getItem('key'));
		if(a.user_access_level=="2"){
			return true;
		}
		else{
			alert('Access Denied! Please contact administrator for permission..')
			this.router.navigate(['./signin']);
		}
		 
	}

	get LOGGED_IN_DATA_CLIENT(){
		var a =JSON.parse(localStorage.getItem('key'));
   		return a;
	}

	

}