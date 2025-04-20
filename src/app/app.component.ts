import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  public employees: Employee[] = [];
  public updatedEmployee: Employee | undefined;
  public deletedEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void{
      this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response : Employee[]) =>{
        this.employees = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddEmployee(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) =>{
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        addForm.reset();
      }
    );

  }

  public onUpdateEmployee(employee: Employee): void{
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) =>{
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    );

  }

   public onDeleteEmployee(): void{
    if(this.deletedEmployee)
    {
      this.employeeService.deleteEmployee(this.deletedEmployee?.id).subscribe(
        (response: void) =>{
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      );
    }
  }

  public onOpenModal(employee: Employee | null, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal')
    }
    if(mode === 'update'){
      if (employee) {
        this.updatedEmployee = employee;
      }
      button.setAttribute('data-target', '#updateEmployeeModal')
    }
    if(mode === 'delete'){
      if(employee){
        this.deletedEmployee = employee;
      }
      button.setAttribute('data-target', '#deleteEmployeeModal')
    }
    container?.appendChild(button);
    button.click();
  }
}
