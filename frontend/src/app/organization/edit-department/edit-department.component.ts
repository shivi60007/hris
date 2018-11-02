import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../globals/global';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatPaginator, MatSort,MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

	private id:any;
	private listingdata:any;
 	private base_api_url:string;
  	private login_data:any;

  	public form: FormGroup;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private http:HttpClient,private router:Router,private global:Global,private dialog: MatDialogRef<EditDepartmentComponent>) { }

  ngOnInit() {

  	 this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id=params['id'];
      this.demo();

    });

  	 this.base_api_url=this.global.BASE_API_URL;

    this.form = this.fb.group({
      department_name: [null, Validators.compose([Validators.required])],
      client_id: ['2'],
     
    });
  }

  demo(){
  	console.log('abhi '+this.id);
  }

   onSubmit(){
    console.log(this.base_api_url);
    this.http.post(this.base_api_url+'add_department',
       {
         department:this.form.value.department_name,
         client_id:this.form.value.client_id,
       }
       )
         .subscribe(
           (data:any)=>{
             if(data.status_code==1){
               console.log('department Added');
               this.dialog.close();
               
               //this.router.navigate(['/organization/department']);
               //this.getListing()
               //this.closeAddExpenseModal.nativeElement.click();
             }else{
               console.log('Failure');
             }
           });
   

  }//onSubmit()

}
