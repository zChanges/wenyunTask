import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  user;
  constructor(private LoginService: LoginService,private router: Router,) { 
    this.user = JSON.parse(window.localStorage.getItem('user')).code;
  }
  ngOnInit() {
  }

  loginOut() {
    this.LoginService.loginOut().subscribe( res=>{
          this.router.navigateByUrl('login');
    })
  }

}
