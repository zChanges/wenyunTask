import { RouterService } from './../../service/router.service';
import { Component, OnInit, ElementRef, ViewChildren, ChangeDetectorRef, EventEmitter  } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ValueService } from "../../service/value.service";
import { AddTaskService } from './addTask.service';
import { PublicMethodService } from './../../service/publicMethod.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({
  selector: "app-addTask",
  templateUrl: "./addTask.component.html",
  styleUrls: ["./addTask.component.scss"]
})
export class AddTaskComponent implements OnInit {

  isEdit = false;
  userList:any;
  validateForm: FormGroup;
  uploadInput: EventEmitter<UploadInput>;

  createUserId: string; //登陆人id
  webId: string;
  title: string;
  productId = "";
  projectId = "";
  versionId = "";

  devFinish: string; //联调时间
  testStart: string; //提测时间
  testFinish: string; // 测试完成时间
  acceptFinish: string; // 验收完成时间
  description: string;
  type = 200; //任务类型（200需求，201bug）
  multipleSelected: any;

  workLoad = "";
  taskFile = -1; //附件


  // 下拉数组
  productList = [];
  projectList = [];
  versionList = [];
  workLoadList = [];

  // 人
  developUserList = [];
  testUserList = [];
  productUserList = [];

  developUsers = [];

  debuggerOption = [];
  debuggers = [];

  testUsers = [];
  productUsers = [];

  // isVisible 模态框modal
  isProduct = false;
  isProject = false;
  isVersion = false;

  isLoading = false;
  isTaskState = true;


  constructor(
    private valueService: ValueService, 
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private addTaskService: AddTaskService,
    private cdr: ChangeDetectorRef,
    private PMService: PublicMethodService,
    private routerService: RouterService
  ) {
    this.workLoadList = this.valueService.Days;
  }

  ngOnInit() {
    this.userList = JSON.parse(window.localStorage.getItem('user'))
    this.uploadInput = new EventEmitter<UploadInput>();
    this.webId = this.userList.webId;
    this.initValidateForm();
    this.getDownLoad();
  }

  /**
   * 获取下拉
   */
  getDownLoad() {
    this.addTaskService.getProduct(this.webId).subscribe((res:any)=>{
      this.productList = res;
    })

    this.addTaskService.getProject(this.webId).subscribe((res:any)=>{
      this.projectList = res;
    })

    this.addTaskService.getProjectVersion(this.webId).subscribe((res:any)=>{
      this.versionList = res;
    })

    // 人
    this.addTaskService.getDevelopUser(this.webId).subscribe((res:any)=>{
      this.developUserList = res;
    })

    this.addTaskService.getTestUser(this.webId).subscribe((res:any)=>{
      this.testUserList = res;
    })

    this.addTaskService.getProductUser(this.webId).subscribe((res:any)=>{
      this.productUserList = res;
    })
    this.cdr.detectChanges();
    

  }

  /**
   * 初始化数组
   */
  initValidateForm(){
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      productId: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      versionId: [null, [Validators.required]],
      devFinish: [null, [Validators.required]],
      testStart: [null, [Validators.required]],
      testFinish: [null, [Validators.required]],
      acceptFinish: [null, [Validators.required]],
      description: [null, [Validators.required]],
      taskState: [null, [Validators.required]],
      workLoad: [null, [Validators.required]],
      developUsers: [null, [Validators.required]],
      debuggers: [null, [Validators.required]],
      testUsers: [null, [Validators.required]],
      productUsers: [null, [Validators.required]],
      taskFile:[null]
    });
  }


  // change 开发
  developChange (isClose,data){
    if(!isClose){
      this.debuggerOption = data.concat();
    }
  }

  /**
   * 保存
   */
  save() {
    this.addTaskService.createTask(
      this.userList.id,this.title,this.description,this.projectId,this.versionId,
      this.productId,this.workLoad,this.type,this.PMService.dateUTC(this.devFinish),
      this.PMService.dateUTC(this.testStart),this.PMService.dateUTC(this.testFinish),
      this.PMService.dateUTC(this.acceptFinish),this.webId,this.taskFile
    ).subscribe( (res:any) => {

            //获取任务数组
            const $days = this.elementRef.nativeElement.querySelectorAll('.days');
            const $debugger = this.elementRef.nativeElement.querySelectorAll('.debugger');
            const $test = this.elementRef.nativeElement.querySelectorAll('.test');
            const $produc = this.elementRef.nativeElement.querySelectorAll('.produc');
            // 重组 获取数据 
            const developData = this.taskUserRegroup(this.developUsers,$days,1)
            const debuggerData = this.taskUserRegroup(this.debuggers,$debugger,2)
            const testData = this.taskUserRegroup(this.testUsers,$test,3)
            const productData = this.taskUserRegroup(this.productUsers,$produc,4)
            // 合并
            var concatTaskData 
            if(this.type == 201){
               concatTaskData = developData.concat(testData);
            }else{
               concatTaskData = developData.concat(debuggerData,testData,productData);
            }
      
            const taskId =  res;
            this.addTaskService.saveTaskUser(taskId,this.type,this.webId,this.userList.id,JSON.stringify(concatTaskData)).subscribe( (request: any)=>{
                console.log(request)
            });
    })
  }

  /**
   * 改变任务类型切换tab
   */
  changeTask() {
    if(this.type == 200){
      this.isTaskState = true
    }else{
      this.isTaskState = false;
    }
    this.developUsers = [];
    this.debuggers = [];
    this.testUsers = [];
    this.productUsers = [];
  }

  /**
   * 重组数组
   */
  taskUserRegroup(arr,$dom,duty) {
    const newArr = [];
    arr.forEach((item,index)=>{
      newArr.push([item.userId,duty,Number($dom[index].value)])
    });
    return newArr;
  }


  onUploadOutput(output: UploadOutput): void {
    // console.log(output) 
    if(output.type === 'allAddedToQueue'){
      const event: any = {
        type: 'uploadAll',
        url: this.routerService.upLoadFile,
        method: 'POST',
        data: { 
          createUserId:this.userList.id,
          webId:this.userList.webId
        },
        concurrency: 1,
        withCredentials:true,
        fieldName:'taskFile'
      };
      this.uploadInput.emit(event);
    }
    if(output.type === 'done'){
      this.taskFile =  output.file.response.data;
    }
  }

  /**
   * 上传附件
   */
  uploadFile() {
    const event: any = {
      type: 'uploadAll',
      url: this.routerService.upLoadFile,
      method: 'POST',
      data: { 
        createUserId:this.userList.id,
        webId:this.userList.webId
      },
      concurrency: 1,
      withCredentials:true,
      fieldName:'taskFile'
    };
    this.uploadInput.emit(event);
  }

}
