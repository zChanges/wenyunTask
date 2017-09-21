import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { TestComponent } from './test/test.component';
import { AddTaskComponent } from './addTask/addTask.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {path: '', redirectTo: 'addTask', pathMatch: 'full'},
      {path:'test',component: TestComponent },
      {path: 'addTask', component: AddTaskComponent}
    ]
  }
  
];

export const WorkspaceRoutes = RouterModule.forChild(routes);
