import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkspaceRoutes } from './workspace.routing';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// 插件
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { NgUploaderModule } from 'ngx-uploader';
// Component
import { WorkspaceComponent } from './workspace.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { AddTaskFlowComponent } from './addTaskFlow/addTaskFlow.component';
import { WorkOrderComponent } from './workOrder/workOrder.component';
import { ProcessFlowComponent } from './processFlow/processFlow.component';

// service
import { AddTaskService } from './addTask/addTask.service';
import { WorkOrderService } from './workOrder/workOrder.service';
import { AddTaskFlowService } from './addTaskFlow/addTaskFlow.service';
import { ProcessFlowService } from './processFlow/processFlow.service';


@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutes,
    FormsModule,
    NgZorroAntdModule.forRoot(),
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    NgUploaderModule
  ],
  declarations: [
    WorkspaceComponent,
    AddTaskComponent,
    AddTaskFlowComponent,
    WorkOrderComponent,
    ProcessFlowComponent,
  ],
  providers:[
    AddTaskService,
    WorkOrderService,
    AddTaskFlowService,
    ProcessFlowService
  ]
})
export class WorkspaceModule { }
