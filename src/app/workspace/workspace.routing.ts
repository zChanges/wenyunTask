import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { AddTaskFlowComponent } from './addTaskFlow/addTaskFlow.component';
import { WorkOrderComponent } from './workOrder/workOrder.component';
import { ProcessFlowComponent } from './processFlow/processFlow.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {path: '', redirectTo: 'workOrder', pathMatch: 'full'},
      {path: 'addTask', component: AddTaskComponent},
      {path: 'addTaskFlow', component: AddTaskFlowComponent},
      {path: 'workOrder', component: WorkOrderComponent},
      {path: 'processFlow', component: ProcessFlowComponent},
      
    ]
  }
  
];

export const WorkspaceRoutes = RouterModule.forChild(routes);
