import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../task.model'; // Ensure this matches the correct Task model path
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'], // Corrected from `styleUrl` to `styleUrls`
})
export class TaskFormComponent {


  @Output() closePanel = new EventEmitter<'SUBMIT' | 'CANCEL'>() // Emits event when form is submitted
  taskForm: FormGroup; // Reactive form to manage task inputs

  private taskService = inject(TaskService); // Inject TaskService
  showModal!: true;

  constructor(private fb: FormBuilder) {
    // Initialize the reactive form with necessary fields
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      id: [0], // Default ID
      project: [0], // Default project value
    });
  }

  // Handles form submission
  handleSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value, // Spread form values into the new Task object
        id: this.generateUniqueId(), // Generate a unique ID
        completed: false, // Default completed status
      };

      this.taskService.addTasks(newTask); // Add task via TaskService
      this.closePanel.emit('SUBMIT'); // Emit close event
      this.taskForm.reset(); // Reset the form after submission
    }
  }

  // Generates a unique ID for the task
  private generateUniqueId(): number {
    return Math.floor(Math.random() * 10000); // Example: Replace with better logic if needed
  }
}
