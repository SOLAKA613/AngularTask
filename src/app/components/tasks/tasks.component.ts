import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  myTask: Task={
    label: '',
    completed: false
  }

  searchText = "";

  tasks: Task[] = []; 
  resultTasks: Task[] = []; 

  showForm = false;
  editForm = false;

  i = 0;

  constructor(private TaskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
      this.TaskService.findAll()
      .subscribe((tasks)=> {this.resultTasks = this.tasks = tasks})
  }

  deleteTask(id: any){
    this.TaskService.delete(id)
    .subscribe(() => {this.tasks = this.tasks.filter(task => task.id != id)})
  }
  
  persistTask(){
    this.TaskService.persist(this.myTask)
    .subscribe((task) => {
      this.tasks = [task, ...this.tasks] // ...this.tasks is called sprid or the rider.
    }); 
    this.resetTask();
    this.showForm = false;
  }

  updateTask(){
    this.TaskService.update(this.myTask)
    .subscribe((task) => {
      this.resetTask();
      this.editForm = true;
    }); 
  }

  resetTask(){
    this.myTask={
      label: '',
      completed: false
    }
  }

  completedTask(task: any){
    this.TaskService.completed(task.id, task.completed)
    .subscribe(() =>
      task.completed = !task.completed
    ) 
  }

  editTask(task: any){
    this.i++;
    this.myTask = task;
    if(this.i%2!=0){
      this.editForm = true;
    }else{
      this.resetTask();
      this.editForm = false;
    }
  }

  searchTasks(){
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
