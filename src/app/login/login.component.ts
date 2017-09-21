import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
// import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName= null;
  passWord= null;

  constructor(private router: Router, private loginService: LoginService) {
  }


  ngOnInit() {
    // this.loginService.login('11', '2').subscribe( res => {
    //   console.log(res);
    // });
  }

  login() {
    this.router.navigateByUrl('Task');
  }



}
