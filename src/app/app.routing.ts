import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'Task',
		loadChildren: './workspace/workspace.module#WorkspaceModule'
	},
	{
		path: 'login',
		component: LoginComponent,
	}
];
@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
  })
  
export class AppRoutesModule { }
