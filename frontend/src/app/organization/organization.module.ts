import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule,MatPaginatorModule } from '@angular/material';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import{ FormsModule,ReactiveFormsModule } from '@angular/forms';



import { OrganizationRoutingModule } from './organization-routing.module';
import { DepartmentComponent } from './department/department.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

import { MatDialogModule,MatSortModule,MatTableModule } from '@angular/material';
import { EditDepartmentComponent } from './edit-department/edit-department.component';


@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    RouterModule,
    MatInputModule,
    NgxDatatableModule,
    FormsModule,
ReactiveFormsModule,

     MatCardModule,
  MatIconModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule,MatPaginatorModule,MatSortModule,
    MatTableModule,MatDialogModule


  ],
  entryComponents:[CreateDepartmentComponent,EditDepartmentComponent],
  declarations: [DepartmentComponent, CreateDepartmentComponent, EditDepartmentComponent]
})
export class OrganizationModule { }
