import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {path: 'addEmployee', component: AddEmployeesComponent},
  {path: 'listEmployee', component: ListEmployeesComponent},
  {path: 'detailEmployee/:id', component: DetailComponent},
  {path: 'edit/:id', component: AddEmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule { }
