import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employees`)
  }
  public getEmployeeById(employeeId: number) : Observable<Employee>{
    return this.http.get<Employee>(`${this.apiServerUrl}/employees/${employeeId}`)
  }

  public addEmployee(employee: Employee) : Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/employees`, employee)
  }

  public updateEmployee(employee: Employee) : Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employees`, employee)
  }
  public deleteEmployee(employeeId: number) : Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employees/${employeeId}`)
  }
}
