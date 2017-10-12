import { Component, OnInit, ChangeDetectorRef, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AddTaskFlowService } from './addTaskFlow.service';
import {ActivatedRoute} from "@angular/router";
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { RouterService } from './../../service/router.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: "app-addTaskFlow",
  templateUrl: "./addTaskFlow.component.html",
  styleUrls: ["./addTaskFlow.component.scss"]
})
export class AddTaskFlowComponent implements OnInit {
  validateForm: FormGroup;
  user:any;

  constructor(private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private addTaskFlowService: AddTaskFlowService,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService,
    private router: Router
  ) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.activatedRoute.params.subscribe( res => {
      this.taskArgument = res;
    });
  }

  uploadInput: EventEmitter<UploadInput>;
  title: string;
  description: string;
  taskArgument:any;
  taskUserList:any;
  newUserId = '';

  isDispose = 3;
  isLoading =  false;
  isPass = 1 ;
  samePostUserList = [];
  strUserList = [];
  strUserId:any;
  fileId = -1;
  nullNotGo = false;
  state
  preDuty='';
  btnType = 'primary'
  btnTypes = ''


  textOptions = {
    height:300,
    language: 'zh',
    placeholderText:'详细描述',
    toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'strikeThrough', 'underline', '|', 'paragraphFormat', 'paragraphStyle', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '|', 'insertImage', 'insertLink', 'insertVideo', 'insertFile', 'html']
  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      isPass: [null],
      newUserId:[null],
      strUserId:[null]
    });
    this.getDownList();
  }



  setDispose(value) {
    // 切换后会触发变换检测，多次修改了一个值，产生报错，切换不应该触发变化检测。通过detectChanges()修改
    this.isDispose= value;
    this.cdr.detectChanges();
  }

  changePass(val) {
    this.isDispose = val;
    if(val==2){
      this.isPass = null;
      this.btnType='';
      this.btnTypes='primary';
    }else if(val == 3){
      this.btnType='primary';
      this.btnTypes='';
    }
    // this.cdr.detectChanges();
  }

  /**
   * 获取duty list
   */
  getDownList() {
    this.addTaskFlowService.getCurrentDuty(this.taskArgument.taskId,this.user.id,this.user.webId).subscribe( (res:any) => {
      if(res.length == 1){
        res[0].duty==1 ? this.nullNotGo = false : this.nullNotGo = true;
      }
      this.taskUserList = res[0];
      if(!this.taskUserList){ return;};
      this.getPreDutyUser();
    })


    this.addTaskFlowService.getSamePostUser(this.user.id,this.user.webId).subscribe( (res:any)=> {
      this.samePostUserList = res;
    });
  }

  /**
   * 保存
   */
  save() {
    if(this.isDispose == 2){
      this.state = 2;
      this.turnOver();
    }else if(this.isDispose == 3){
      this.state = this.isPass;
      if(this.isPass == 1){//通过
        this.changeSuccessStatus();
      }else if(this.isPass == 0){//不通过
        this.changeFailStatus();
      }
    }
    1
  }

  createTaskProcess() {
    this.addTaskFlowService.createTaskProcess(
      this.taskArgument.taskId,
      this.user.id,
      this.title,this.description,
      this.taskArgument.todoStatusId,
      this.state,
      this.fileId
    ).subscribe( res => {
      this.router.navigateByUrl('task/workOrder');
    })
  }


  /**
   * 移交
   */
  turnOver() {
    this.addTaskFlowService.handNewUser(this.user.id,this.newUserId,this.taskArgument.taskId).subscribe( res => {
      this.createTaskProcess();
    })
  }

  /**
   * 处理-通过
   */
  changeSuccessStatus() {
    this.addTaskFlowService.changeSuccessStatus(this.taskArgument.taskId,this.user.id,this.taskArgument.todoStatusId,this.user.webId).subscribe( res => {
      this.createTaskProcess();
    })
  }

  /**
   *  处理-不通过
   */
  changeFailStatus () {
    this.strUserId = this.strUserId.join(',');
    this.addTaskFlowService.changeFailStatus(
      this.taskArgument.taskId,this.preDuty,
      this.strUserId,this.taskArgument.todoStatusId,
      this.user.webId,this.taskUserList.type
    ).subscribe( res =>{
      this.createTaskProcess();
    });
  }


  /**
   * 上传附件
   */
  onUploadOutput(output: UploadOutput): void {
    if(output.type === 'allAddedToQueue'){
      const event: any = {
        type: 'uploadAll',
        url: this.routerService.upLoadFile,
        method: 'POST',
        data: { 
          createUserId:this.user.id,
          webId:this.user.webId
        },
        concurrency: 1,
        withCredentials:true,
        fieldName:'taskFile'
      };
      this.uploadInput.emit(event);
    }
    if(output.type === 'done'){
      this.fileId =  output.file.response.data;
    }
  }
  
  getPreDutyUser() {

    this.addTaskFlowService.getPreDutyUser(this.taskArgument.taskId,this.taskUserList.duty,this.user.webId,this.taskUserList.type).subscribe( (res:any) => {
      setTimeout(()=>{
        this.preDuty = res.preDuty;
        this.strUserList = res.listPreDutyUser;
      },2000)
    });
  }

  /**
   * 点击不通过获取关联人
   */
  getNotpass() {
    this.getPreDutyUser();
  }

  
}
