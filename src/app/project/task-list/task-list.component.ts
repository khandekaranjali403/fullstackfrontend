import { Component, inject } from '@angular/core';
import { Task } from '../../task.model';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskService } from '../../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const emptyTask = {
  name: '',
  description: '',
  dueDate: '',
  completed: 'false',
  project: 0,
  id: 0,
};

@Component({
  selector: 'app-task-list',
  standalone: true, // If using standalone components
  imports: [DatePipe, ReactiveFormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'], // Fixed typo from `styleUrl` to `styleUrls`
})

export class TaskListComponent {
  tasks: Task[] = []; // Initialize tasks array
  taskForm!: FormGroup; // Reactive form, initialized in ngOnInit or constructor
  showModal: boolean = false; // Tracks modal visibility
  // selectedTask: Task = emptyTask; // Ensure a new object is created
  formType: 'CREATE' | 'UPDATE' = 'CREATE'; // Tracks form type (Create or Update)

  private taskService = inject(TaskService); // Injecting TaskService

  constructor(private fb: FormBuilder) {
    // Initialize the reactive form
    this.taskForm = this.fb.group({
      name: ['', Validators.required], // Task name is required
      description: [''], // Task description (optional)
      dueDate: ['', Validators.required], // Due date is required
    });
  }

  // Open modal
  openModal(): void {
    this.showModal = true;
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
    this.taskForm.reset(); // Reset the form when closing the modal
  }

  // Add a new task
  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: this.tasks.length + 1, // Generate a unique ID
        name: this.taskForm.value.name,
        description: this.taskForm.value.description || '', // Get the description from the form
        dueDate: this.taskForm.value.dueDate, // Get the due date from the form
        completed: false,
        project: 0,
      };

      this.tasks.push(newTask); // Add the new task object to the tasks list
      this.closeModal(); // Close modal after adding the task
    }
  }

  // Toggle task completion
  handleCheckbox(id: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
      this.taskService.updateTask(this.tasks[taskIndex]); // Update task via service
    } else {
      console.error(`Task with ID ${id} not found.`);
    }
  }
  // updateTask(task: Task) {
  //   this.selectedTask = task;
  //   this.formType = 'UPDATE';
  //   this.showModal = true;
  // }

  // Delete a task
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.taskService.deleteTask(id); // Call service to delete task
  }
}
