import { Component, OnInit, ChangeDetectorRef, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { AddTaskFlowService } from './addTaskFlow.service';
import {ActivatedRoute} from "@angular/router";
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { RouterService } from './../../service/router.service';
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
    private routerService: RouterService
  ) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.activatedRoute.params.subscribe( res => {
      this.taskArgument = res;
      console.log(res);
    });
  }

  uploadInput: EventEmitter<UploadInput>;
  title: string;
  description: string;
  taskArgument:any;
  taskUserList:any;
  newUserId = '';

  isDispose = 2;
  isLoading =  false;
  isPass = true ;
  samePostUserList = [];
  strUserList = [];
  strUserId = '';
  fileId = -1;
  nullNotGo = false;


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
      radioValue: [null, [Validators.required]],
      isPass: [null, [Validators.required]],
      people: [null, [Validators.required]],
      newUserId:[null,[Validators.required]],
    });
    this.getDownList();
  }

  _log(value) {
    console.log(value);
  }



  setDispose(value) {
    // 切换后会触发变换检测，多次修改了一个值，产生报错，切换不应该触发变化检测。通过detectChanges()修改
    this.isDispose= value;
    this.cdr.detectChanges();
  }

  changePass(val) {
    this.isDispose = val;
    // this.cdr.detectChanges();
  }

  /**
   * 获取duty list
   */
  getDownList() {
    this.addTaskFlowService.getCurrentDuty(this.taskArgument.taskId,this.user.id,this.user.webId).subscribe( (res:any) => {
      // console.log(res)
      if(res.length == 1){
        if(res[0].duty==1){
          //没有不通过
          this.nullNotGo = true;
        }
      }
      this.taskUserList = res[0];
    })


    this.addTaskFlowService.getSamePostUser(this.user.id,this.user.webId).subscribe( (res:any)=> {
      // console.log(res);
      this.samePostUserList = res;
    }) 

   
  }

  /**
   * 保存
   */
  save() {
    debugger
    var state;
    if(this.isDispose == 2){
      state = 2;
      this.turnOver();
    }else if(this.isDispose == 3){
      state = this.isPass;
      if(!this.nullNotGo){
        this.changeSuccessStatus();
      }else{
        this.changeFailStatus();
      }
    }
    this.addTaskFlowService.createTaskProcess(
      this.taskArgument.taskId,
      this.user.id,
      this.title,this.description,
      this.taskArgument.todoStatusId,
      state,
      this.fileId
    ).subscribe( res => {
      console.log(res);
    })
  }

  /**
   * 移交
   */
  turnOver() {
    this.addTaskFlowService.handNewUser(this.user.id,this.newUserId,this.taskArgument.taskId).subscribe( res => {
      console.log(res);
    })
  }

  /**
   * 处理-通过
   */
  changeSuccessStatus() {
    this.addTaskFlowService.changeSuccessStatus(this.taskArgument.taskId,this.user.id,this.taskArgument.todoStatusId,this.user.webId).subscribe( res => {
      console.log(res);
    })
  }

  /**
   *  处理-不通过
   */
  changeFailStatus () {
    this.addTaskFlowService.changeFailStatus(
      this.taskArgument.taskId,this.taskUserList.duty,
      this.strUserId,this.taskArgument.todoStatusId,
      this.user.webId,this.taskUserList.type
    ).subscribe( res =>{
      console.log(res);
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
    debugger
    this.addTaskFlowService.getPreDutyUser(this.taskArgument.taskId,this.taskUserList.duty,this.user.webId,this.taskUserList.type).subscribe( (res:any) => {
      setTimeout(()=>{
        console.log(res)
        this.strUserList = res;
      },2000)
    });
  }


     

  
}
