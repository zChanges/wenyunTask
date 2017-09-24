import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { WorkspaceRoutes } from './workspace.routing';
import { WorkspaceComponent } from './workspace.component';
import { AddTaskComponent } from './addTask/addTask.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// 插件
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutes,
    FormsModule,
    NgZorroAntdModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    TestComponent,
    WorkspaceComponent,
    AddTaskComponent
]
})
export class WorkspaceModule { }
