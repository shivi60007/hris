import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule } from '@angular/material';
  import { AuthenticationService } from '../../_services/authentication.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthenticationService) {}

  ngOnInit() {

    this.form = this.fb.group ( {
      username: [null , Validators.compose ( [ Validators.required ] )] ,
      password: [null , Validators.compose ( [ Validators.required ] )],
      emp_type: [null , Validators.compose ( [ Validators.required ] )],
    } );
  }

  onSubmit() {

    console.log(this.form.value);
    var username=this.form.value.username;
     var password=this.form.value.password;
     var employee_type=this.form.value.emp_type;
    //this.router.navigate ( [ '/dashboard' ] );
     this.auth.getUserDetails(username,password,employee_type).subscribe((data:any)=>{      
      console.log(data);
      var key;
      if(data.status_code==1){
        console.log(data.data);
        let myObj = data.data;
            localStorage.setItem('key', JSON.stringify(myObj));
            this.router.navigate(['/dashboard']);
      }
      else{
      }
      //console.log(data.status_code);
    });
  }

}
