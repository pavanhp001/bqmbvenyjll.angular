import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

  employee: Employee;
  employees: Employee[];
  id: number;
  submitted = false;
  isEditable: boolean;
  loginForm: FormGroup;
  get f() { return this.loginForm.controls; }
  constructor(private route: ActivatedRoute,
              private empService: EmployeeService,
              private router: Router) { }

  ngOnInit() {
    this.employees = this.empService.getEmployees();

    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id != null && this.id != 0) {
      this.isEditable = true;
      console.log('id: ' + this.id);

      this.employee = this.getEmployeById(this.id);

      this.loginForm = new FormGroup({
        name: new FormControl(this.employee.name, [Validators.required]),
        location: new FormControl(this.employee.location, [Validators.required]),
        email: new FormControl(this.employee.email, [Validators.required, Validators.email] ),
        mobile: new FormControl(this.employee.mobile, [Validators.required, , Validators.pattern('[6-9]\\d{9}')])
      });
    } else {
      console.log('New form ');
      this.isEditable = false;
      this.loginForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email] ),
        mobile: new FormControl('', [Validators.required, Validators.pattern('[6-9]\\d{9}')])
      });
    }
  }

  submitEmp() {
    console.log("submitEmp: ");
    this.submitted = true;
    if (!this.isEditable) {
      const maxId = Math.max.apply(Math,
        this.employees.map(
          function(emp) {
            return emp.id;
          }));
      if (this.loginForm.invalid) {
        return;
      } else {
        const emp = this.loginForm.value;
        console.log('Emp: ' + this.loginForm.value);
        let e: Employee = new Employee();
        console.log("maxId: "+maxId);
        if ( maxId == -Infinity) {
          e.id = 1;
        } else {
          e.id = maxId + 1;
        }
        this.mapEmployee(e, emp);
        this.empService.getEmployees().push(e);
        console.log('employee in submitEmp= ' + emp.name);
        this.router.navigate(['/detailEmployee/', e.id]);
      }
    } else if ( this.isEditable){

      if (this.loginForm.invalid) {
        return;
      } else {
        const emp = this.loginForm.value;
        this.updateEmployeById(emp);
      }
    }
  }

  private mapEmployee(e: Employee, emp: any) {
    e.name = emp.name;
    e.location = emp.location;
    e.email = emp.email;
    e.mobile = emp.mobile;
  }

  getEmployeById( id ) {
    const updatedemployee = this.employees.find(n => n.id == id);
    if (updatedemployee != undefined) {
      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i].id === id) {
          return this.employees[i];
        }
      }
    }
  }

  updateEmployeById(emp) {
    const updatedemployee = this.employees.find(n => n.id == this.id);
    if (updatedemployee != undefined) {
      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i].id === this.id) {
          let e: Employee = new Employee();
          console.log(emp.name);
          e.id = this.id;
          this.mapEmployee(e, emp);
          this.empService.getEmployees()[i] = e;
          console.log(this.empService.getEmployees()[i].name);
          this.router.navigate(['/listEmployee']);
        }
      }
    }
  }
}
