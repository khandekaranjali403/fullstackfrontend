import { DatePipe } from "@angular/common";

export interface Task {
   id:number,
   name:string,
   description:string,
   completed:boolean,
   dueDate:Date,
   project:number
}