import { userInfo } from './userInfo.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
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
  userName= '';
  passWord= '';
  isLoading = false;
  message:string;

  constructor(private router: Router, private loginService: LoginService,private fb: FormBuilder,private _message: NzMessageService) {
  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });

    // this.login();
  }


  login() {
    this.isLoading = true;
    this.loginService.login(this.userName, this.passWord).subscribe( (res:userInfo) => {
      this.isLoading = false;
      this.router.navigateByUrl('task');
      window.localStorage.setItem('user',JSON.stringify(res));
    },rej=>{
      this._message.create('error',rej);
      this.isLoading = false;
    });
    this.isLoading = false;

    // this.router.navigateByUrl('task');
    
  }


}
