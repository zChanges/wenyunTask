import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { WorkspaceRoutes } from './workspace.routing';
import { WorkspaceComponent } from './workspace.component';
import { AddTaskComponent } from './addTask/addTask.component';

import { FormsModule } from '@angular/forms';

// 插件
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {NgxTreeSelectModule} from 'ngx-tree-select';

@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutes,
    FormsModule,
    NgZorroAntdModule.forRoot(),
    NgxTreeSelectModule.forRoot({
      allowFilter: true,
      filterPlaceholder: 'Type your filter here...',
      maxVisibleItemCount: 5,
      idField: 'id',
      textField: 'name',
      childrenField: 'children',
      allowParentSelection: true
    })
  ],
  declarations: [
    TestComponent,
    WorkspaceComponent,
    AddTaskComponent
]
})
export class WorkspaceModule { }
