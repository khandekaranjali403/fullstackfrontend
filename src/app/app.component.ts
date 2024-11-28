import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ProjectComponent,MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend TaskMaster';
}
