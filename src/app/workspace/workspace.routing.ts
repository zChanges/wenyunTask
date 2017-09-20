import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { TestComponent } from './test/test.component';
const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {path: '', redirectTo: 'test', pathMatch: 'full'},
      {path:'test',component: TestComponent },
    ]
  }
  
];

export const WorkspaceRoutes = RouterModule.forChild(routes);
