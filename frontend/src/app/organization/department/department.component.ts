import { Component, OnInit,ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule } from '@angular/material';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import{ FormsModule,ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';
//import {FlashMessage} from 'angular-flash-message';

import {PageEvent} from '@angular/material';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { CreateDepartmentComponent } from '../create-department/create-department.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
export interface DepartmentData {
    id: string;
    name: string;
}

export interface Issue {
    data: string;
    //name: string;
}



@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
	 public form: FormGroup;
    index: number;
    id: number;
   displayedColumns: string[] = ['id', 'name','actions'];
     @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild(MatSort) sort: MatSort;
  listingdata: MatTableDataSource<DepartmentData>;
	 constructor(private fb: FormBuilder,private http: HttpClient,public dialog: MatDialog) {
    
  }

    ngOnInit() {
    
    this.getListing();
    
  }


  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);//this.getListing()

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

   getListing(){ 

   this.http.post('http://localhost/hris/index.php/api/get_departments',
       {
         client_id:'2'
       }
       )
         .subscribe(
           (data:any)=>{
           	//return data.data;
             console.log(data.data);
             //this.listingdata=data.data;
             this.listingdata = new MatTableDataSource(data.data);
             this.listingdata.paginator = this.paginator;
             this.listingdata.sort = this.sort;
           });

  }//getListing

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.listingdata.filter = filterValue;
  }

  addNew(issue: Issue) {
    const dialogRef = this.dialog.open(CreateDepartmentComponent, {
      data: {issue: 1 }
    }); 
    // dialogRef.close();

    dialogRef.afterClosed().subscribe(result => {
         
      console.log(`Dialog result:`+result); // Pizza!
    

      

     /* if (result === 1) {

        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        //this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        //this.refreshTable();
      }*/
    });

    

  }

    startEdit(issue: Issue) {
    const dialogRef = this.dialog.open(EditDepartmentComponent, {
      data: {issue: 1 }
    }); 
    // dialogRef.close();



    

  }
   private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

/*  deleteItem(i: number, id: number, title: string, state: string, url: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, title: title, state: state, url: url}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }*/

 // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;





  //3rd ends

}
