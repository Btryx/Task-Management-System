import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "./task";
import {AuthService} from "./login/auth.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL = `${environment.apiBaseUrl}/api/tasks`;
  private URLAll = `${environment.apiBaseUrl}/api/tasks/all`;
  private URLStatus = `${environment.apiBaseUrl}/api/tasks/status`;

  username: string = "";
  password: string = "";

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAllTasks(): Observable<Task[]>{
    const headers = this.getHeaders();
    return this.httpClient.get<Task[]>(this.URLAll, {headers});
  }

  getTasksByStatus(status: string): Observable<Task[]>{
    const headers = this.getHeaders();
    return this.httpClient.get<Task[]>(`${this.URLStatus}/${status}`, {headers});
  }

  getTask(id: string): Observable<Object>{
    const headers = this.getHeaders();
    return this.httpClient.get(`${this.URL}/${id}`,{headers});
  }

  createTask(task: Task): Observable<Object>{
    const headers = this.getHeaders();
    return this.httpClient.post(this.URLAll, task, {headers});
  }

  updateTask(id: string, task: Task): Observable<Object>{
    const headers = this.getHeaders();
    return this.httpClient.put(`${this.URL}/${id}`, task, {headers});
  }

  deleteTask(id: string): Observable<Object>{
    const headers = this.getHeaders();
    return this.httpClient.delete(`${this.URL}/${id}`,{headers})
  }

  private getHeaders() {
    this.username = this.authService.getLoggedInUserName();
    this.password = this.authService.getLoggedInPassword();
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return headers;
  }
}
