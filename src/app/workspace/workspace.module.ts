import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { WorkspaceRoutes } from './workspace.routing';
import { WorkspaceComponent } from './workspace.component';
@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutes
  ],
  declarations: [
    TestComponent,
    WorkspaceComponent
  ]
})
export class WorkspaceModule { }
