import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  [x: string]: any;


  tasks:Task [] = [
    {
     id:1,
     name:"Design Wireframes",
     description:"",
     completed:false,
     dueDate:new Date("2024-11-28"),
     project:1
    },
    {
      id:2,
      name:"Developing Frontend",
      description:"",
      completed:false,
      dueDate:new Date("2024-11-28"),
      project:1
     },
     {
      id:3,
      name:"Developing Backend",
      description:"",
      completed:false,
      dueDate:new Date("2024-11-28"),
      project:1
     },
  
    ];
  
  constructor() {}
  //getTasks

getTasks(){
  return this.tasks
}

  //addTaks
addTasks(task:Task){
  this.tasks.push(task)
  return this.tasks;
}

  //updateTasks
  updateTask(newtask: Task){
    const taskIndex = this.tasks.findIndex((task) => task.id === newtask.id);
    this.tasks[taskIndex] = newtask;
    return this.tasks;
  }



  //deleteTasks
  deleteTask(id: number){
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(taskIndex,1);
    return this.tasks;
  }

}
