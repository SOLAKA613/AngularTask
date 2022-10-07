import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "http://localhost:5000/tasks";

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Task[]>(this.apiUrl);
  }

  delete(id: any){
    return this.http.delete(`${this.apiUrl}/${id}`);//you can write this line (id) in traditional way like this return this.http.delete("http://localhost:5000/tasks/" + id);, remarq dont write with  instead of double or single quotes but, instead of them use  backtick (`) characters to open and close url. 
  }

  persist(task: any){
    return this.http.post<Task>(this.apiUrl, task);
  }

  completed(id : any, completed : any){
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, {completed: !completed});
  }

  update( task : any){
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }
}
