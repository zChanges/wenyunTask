import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName=null;
  passWord=null;
  constructor(private router:Router) { 
    
  }


  ngOnInit() {
    // this.userName="11";
    // this.passWord="222"
  }

  login() {
    this.router.navigateByUrl('Task')
  }

}
