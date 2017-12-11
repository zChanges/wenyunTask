import { Router, ActivatedRoute } from '@angular/router';
import { RouterService } from './../../service/router.service';
import { Component, OnInit, ElementRef,ViewChild, ViewChildren, ChangeDetectorRef, EventEmitter  } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ValueService } from "../../service/value.service";
import { AddTaskService } from './addTask.service';
import { PublicMethodService } from './../../service/publicMethod.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import {NzModalService} from 'ng-zorro-antd';
import Quill from 'quill';
@Component({
  selector: "app-addTask",
  templateUrl: "./addTask.component.html",
  styleUrls: ["./addTask.component.scss"]
})
export class AddTaskComponent implements OnInit {



  isEdit = true;
  userList:any;
  validateForm: FormGroup;
  uploadInput: EventEmitter<UploadInput>;

  createUserId: string; //登陆人id
  webId: string;
  title: string;
  productId = "";
  projectId = "";
  versionId = "";

  devFinish; //联调时间
  testStart; //提测时间
  testFinish; // 测试完成时间
  acceptFinish; // 验收完成时间
  description;
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

  isBug = false;

  // edit
  taskId = null;
  routArgument;
  editDisabled = false;

  isSavePass = true;

  isFilelading = false;

  constructor(
    private valueService: ValueService, 
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private addTaskService: AddTaskService,
    private cdr: ChangeDetectorRef,
    private PMService: PublicMethodService,
    private routerService: RouterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmServ: NzModalService
  ) {
    this.workLoadList = this.valueService.Days;
    this.activatedRoute.params.subscribe( res => {
      this.routArgument = res;
    });
  }
  

  ngOnInit() {
    this.userList = JSON.parse(window.localStorage.getItem('user'))
    this.uploadInput = new EventEmitter<UploadInput>();
    this.webId = this.userList.webId;
    this.initValidateForm();
    this.getDownLoad();
    if(this.routArgument.state == 'edit'){
      setTimeout(()=>{
        this.editGetData();
      },1000)
      this.editDisabled = true;
      this.isEdit = false;
    }
  }
  

  /**
   * 获取下拉
   */
  getDownLoad() {
    this.getProductDown();
    this.getProjectDown();
    this.getProjectVersionDown();
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

  // 获取产品、项目、版本

  getProductDown() {
    this.addTaskService.getProduct(this.webId).subscribe((res:any)=>{
      this.productList = res;
    });
  }

  getProjectDown() {
    this.addTaskService.getProject(this.webId).subscribe((res:any)=>{
      this.projectList = res;
    });
  }

  getProjectVersionDown() {
    this.addTaskService.getProjectVersion(this.webId).subscribe((res:any)=>{
      this.versionList = res;
    });
  }


  

  /**
   * 初始化验证
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
      developUsers: [null],
      testUsers: [null],
      debuggers: [null],
      productUsers: [null],
      taskFile:[null]
    });

    if(this.routArgument.state == 'edit'){
      this.validateForm = this.fb.group({
        title: [null ],
        productId: [null],
        projectId: [null],
        versionId: [null],
        devFinish: [null, [Validators.required]],
        testStart: [null, [Validators.required]],
        testFinish: [null, [Validators.required]],
        acceptFinish: [null, [Validators.required]],
        description: [null],
        taskState: [null],
        workLoad: [null],
        developUsers: [null],
        debuggers: [null],
        testUsers: [null],
        productUsers: [null],
        taskFile:[null]
      });
    }
  }


  changeValidBug(){
    this.validateForm = this.fb.group({
      debuggers: [null],
      productUsers: [null]
    });
  }


  // change 开发
  developChange (isClose,data){
    if(!isClose){
      this.debuggerOption = data.concat();
    }
  }

  error() {
    this.confirmServ.error({
      title: '新建任务失败！',
      content: '各职责任务人员必填'
    });
  }

  /**
   * 保存
   */
  save() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if(!this.validateForm.valid){return};

    if(this.isFilelading){
      this.confirmServ.error({
        title: '新建任务失败！',
        content: '文件正在上传中,请稍后……'
      });
      return;
    }

    if(this.type == 201){
      if( this.developUsers.length < 1 || this.testUsers.length < 1){
        this.error();
        return
      }
    }else{
      if( this.debuggers.length < 1 || this.productUsers.length < 1 || this.developUsers.length < 1 || this.testUsers.length < 1){
        this.error();
        return
      }
    }
   
    if(this.routArgument.state == 'edit'){
      this.upDataTask();
      return;
    }
    this.isLoading = true;
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
                this.router.navigateByUrl('task/workOrder');
                this.isLoading = false;
            },rej=>{ this.isLoading = false;});
    },rej=>{ this.isLoading = false;});
  }

  /**
   * 改变任务类型切换tab
   */
  changeTask() {
    this.developUsers = [];
    this.debuggers = [];
    this.testUsers = [];
    this.productUsers = [];
    if(this.type == 200){
      this.isTaskState = true;
      this.isBug = false;
    }else{
      this.isTaskState = false;
      this.isBug = true;
      this.acceptFinish = 1483200000;
      this.devFinish = 1483200000;
    }

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
      this.isFilelading = true;
    }
    if(output.type === 'done'){
      this.taskFile =  output.file.response.data;
      this.isFilelading = false;
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


  // 修改产品
  productObject = {};
  editRow = null;
  editProduc(data) {
    this.productObject[ data.id ] = { ...data };
    this.editRow = data.id;
  }

  saveProduct(data) {
    Object.assign(data, this.productObject[ data.id ]);
    this.addTaskService.updateProduct(data.name,this.userList.id,data.id).subscribe( res=>{
      this.editRow = null;
      this.getProductDown();
    });
  }

  delProduc(data) {
    this.addTaskService.delProduct(this.userList.id,data.id).subscribe(res=>{
      this.getProductDown();
    })
  }


  cancel(data) {
    this.productObject[ data.key ] = {};
    this.editRow = null;
  }

  addProduc(data){
    this.addTaskService.addProduct(data,this.userList.id).subscribe(res=>{
      this.getProductDown();
    })
  }


  // 修改版本
  projectObject = {};
  projectRow = null;
  projectName = '';
  editProject(data) {
    this.projectObject[ data.id ] = { ...data };
    this.projectRow = data.id;
  }

  saveProject(data) {
    Object.assign(data, this.projectObject[ data.id ]);
    this.addTaskService.updateProject(data.name,this.userList.id,data.id).subscribe( res=>{
      this.projectRow = null;
      this.getProjectVersionDown();
    });
  }

  delProject(data) {
    this.addTaskService.delProject(this.userList.id,data.id).subscribe(res=>{
      this.getProjectVersionDown();
    })
  }


  cancelProject(data) {
    this.projectObject[ data.key ] = {};
    this.projectRow = null;
  }

  addProjectName(data){
    this.addTaskService.addProject(data,this.userList.id).subscribe(res=>{
      this.getProjectDown();
    })
  }



  // 修改产品
  versionObject = {};
  versionRow = null;
  versionName = '';
  editVersion(data) {
    this.versionObject[ data.id ] = { ...data };
    this.versionRow = data.id;
  }

  saveVersion(data) {
    Object.assign(data, this.versionObject[ data.id ]);
    this.addTaskService.updateprojectVersion(data.name,this.userList.id,data.id).subscribe( res=>{
      this.versionRow = null;
      this.getProjectVersionDown();
    });
  }

  delVersion(data) {
    this.addTaskService.delprojectVersion(this.userList.id,data.id).subscribe(res=>{
      this.getProjectVersionDown();
    })
  }


  cancelVersion(data) {
    this.versionObject[ data.key ] = {};
    this.versionRow = null;
  }

  addVersionName(data){
    this.addTaskService.addprojectVersion(data,this.userList.id).subscribe(res=>{
      this.getProjectVersionDown();
    })
  }
  

/**********************
 ****    编辑      **** 
 **********************/

  //编辑
  editGetData() {
    this.addTaskService.getCommonTask(this.routArgument.taskId).subscribe((res:any)=>{
      this.title = res.title;
      this.description = res.description;
      this.projectId = res.projectId;
      this.versionId = res.versionId;
      this.productId = res.productId;
      this.workLoad = res.workLoad;
      this.type = res.type;
      this.devFinish = Number(res.devFinish+'000');
      this.testStart = Number(res.testStart+'000');
      this.testFinish = Number(res.testFinish+'000');
      this.acceptFinish = Number(res.acceptFinish+'000');
      if(this.type == 200){
        this.isTaskState = true;
        this.isBug = false;
      }else{
        this.isTaskState = false;
        this.isBug = true;
        this.devFinish = 0;
        this.acceptFinish = 0;
      }
      // this.webId,this.taskFile
    });

    this.addTaskService.getTaskUserList(this.routArgument.taskId).subscribe((res:any)=>{
      res.forEach(element => {
        switch (element.duty) {
          case 1:
          this.developUsers.push(element)
          this.dayChange('.days',this.developUsers);
            break;
          case 2:
          this.debuggers.push(element)
          this.dayChange('.debugger',this.debuggers);
            break;
          case 3:
          this.testUsers.push(element)
          this.dayChange('.test',this.testUsers);
            break;
          case 4:
          this.productUsers.push(element)
          this.dayChange('.produc',this.productUsers);
            break;
          default:
            break;
        }
      });
    });
  }

  // 获取天数
  dayChange(dom,data){
    setTimeout(()=>{
      const $dom = this.elementRef.nativeElement.querySelectorAll(dom);
      if($dom.length>0){
        data.forEach((element,index) => {
          $dom[index].value = element.userWork;
        });
      }else{
        $dom[0].value = data[0].userWork;
      }
    },500)

  }

  // 更新日期
  upDataTask(){
    var testStart, testFinish;
    var devFinish, acceptFinish;
    if(typeof(this.testStart) == 'number' || typeof(this.testFinish) == 'number'){
      testStart = this.PMService.dateUTC(new Date(this.testStart));
      testFinish = this.PMService.dateUTC(new Date(this.testFinish))
    }else{
      testStart = this.PMService.dateUTC(this.testStart);
      testFinish = this.PMService.dateUTC(this.testFinish)
    }
    if(this.type == 201){
      devFinish = 0 ;
      acceptFinish = 0;
    }else{
      devFinish = this.PMService.dateUTC(this.devFinish)
      acceptFinish = this.PMService.dateUTC(this.acceptFinish)
    }
    this.addTaskService.editTask(this.routArgument.taskId,devFinish,testStart,testFinish,
      acceptFinish,this.userList.webId).subscribe(res=>{
      this.router.navigateByUrl('task/workOrder');
    })
  }



  logChange($event: any) {
    console.log($event);
  }

}
