import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  userName= null;
  passWord= null;
  isLoading = false;

  constructor(private router: Router, private loginService: LoginService,private fb: FormBuilder) {
  }


  ngOnInit() {
    // this.loginService.login('11', '2').subscribe( res => {
    //   console.log(res);
    // });
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

  login() {
    this.isLoading = true;
    this.router.navigateByUrl('task');
  }



}
