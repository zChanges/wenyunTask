import { waitTaskInfo } from './workOrderInfo.model';
import { ValueService } from './../../service/value.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { AddTaskService } from './../addTask/addTask.service';
import { WorkOrderService } from './workOrder.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AddTaskFlowService } from './../addTaskFlow/addTaskFlow.service';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: "app-workOrder",
  templateUrl: "./workOrder.component.html",
  styleUrls: ["./workOrder.component.scss"]
})
export class WorkOrderComponent implements OnInit {
  isSearch = false;
  userList: any;
  webId: string;
  productList = [];
  projectList = [];
  versionList = [];
  typeList = [];
  taskTypeList = []; // 任务单类型数据
  taskType='1'; // 任务单类型值
  startTime:any = ''; // 开始时间
  finishTime:any = ''; // 结束时间
  taskStateList = [];
  taskStatus = ''; // 状态
  productId = ''; // 产品id
  projectId = '';
  versionId = '';
  taskUserId = '';
  type = ''; //类型
  userPost=null;
  title = '';

  isDisabled = true;

  _loading = false;
  _total = 0;
  _pageIndex = 1;
  _pageSize = 10;



  _options  = [
    {
      value: "1",
      label: "1",
      children: [
        {
          value: "2",
          label: "aaaaa",
          isLeaf: true
        },
        {
          value: "2-2",
          label: "bbbb",
          isLeaf: true
        }
      ]
    }
  ];

  _data = [];
  constructor(private fb: FormBuilder,
    private addTaskService: AddTaskService, 
    private valService:ValueService, 
    private workOrderService: WorkOrderService,
    private router: Router,
    private AddTaskFlowService: AddTaskFlowService,
    private confirmServ: NzModalService
  ) {
    this.userList = JSON.parse(window.localStorage.getItem('user'))
    this.webId = this.userList.webId;
  }

  ngOnInit() {
    this.getDownLoad();
    this.getPost();
    this.getCurrentPost();
    // this.loadTable();
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

    this.taskTypeList = this.valService.getDownTaskType();

    this.taskStateList = this.valService.getDownState();
    
    this.typeList = this.valService.getDownType();

  }

  changeOption(event) {
    if(!event){
      this.taskType === '1' || this.taskType === '2' ? this.isDisabled = true : this.isDisabled = false;
      this.searchTask(event);
    }
  }

  changeCascader() {
    this.searchTask(false);
  }

  refreshData(pageIndex){
    var userId = '';
    this.taskType != '4' ?  userId = this.userList.id : userId = '';
    var taskUserId = '';
    if(this.taskUserId.length == 0){ 
      taskUserId = '';
    }else{
      taskUserId = this.taskUserId[1]
    }
    this.getTaskBy(userId,this.startTime,this.finishTime,
      this.taskStatus,this.productId,this.projectId,this.versionId,
      taskUserId,this.userList.webId,this.type,pageIndex,this._pageSize,this.title);
  }

  searchTask (event) {
    this._pageIndex = 1;
    this._loading = true;
    if(event){return};
      switch (this.taskType) {
        case '1':// 待处理
          this.workOrderService.getWaitTask(this.userList.id,this.userList.webId).subscribe((res: waitTaskInfo) => {
              this._data = this.regroupData(res);
              this._loading = false;
            this._total = 0;
          },rej=>{  this._loading = false; });
          break;
        case '2':// 本周已处理
          this.workOrderService.getAlreadyDeal(this.userList.id,this.userList.webId).subscribe((res:any) => {
            this._data = this.regroupData(res.list);
            this._loading = false;
            this._total = 0;
          },rej=>{  this._loading = false; });
          break;
        case '3':// 由我创建，
        case '4':// 已关闭
          var taskUserId = '';
          if(this.taskUserId.length == 0){ 
            taskUserId = '';
          }else{
            taskUserId = this.taskUserId[1]
          }
          var userId;
          this.taskType != '4' ?  userId = this.userList.id : userId = '';
          if(this.startTime == 0){
            this.startTime = '';
          }  
          if(this.finishTime == 0){
            this.finishTime = '';
          }  

          this.getTaskBy(userId,this.startTime,this.finishTime,
            this.taskStatus,this.productId,this.projectId,this.versionId,
            taskUserId,this.userList.webId,this.type,this._pageIndex,this._pageSize,this.title);

          // this.workOrderService.getTaskByProperty(userId,this.startTime,this.finishTime,
          //   this.taskStatus,this.productId,this.projectId,this.versionId,
          //   taskUserId,this.userList.webId,this.type,this._pageSize,this._pageIndex).subscribe((res:any) => {
          //     this._data = this.regroupData(res.data);
          //     this._loading = false;
          //     this._total = res.pageDataCount;
          //   },rej=>{  this._loading = false; });
          break;
        default:
          break;
      }
  }

  getTaskBy(userId,startTime,finishTime,taskStatus,productId,projectId,versionId,taskUserId,webId,type,pageIndex,pageSize,title) {
    this.workOrderService.getTaskByProperty(userId,startTime,finishTime,taskStatus,productId,
      projectId,versionId,taskUserId,webId,type,pageIndex,pageSize,title).subscribe((res:any) => {
        this._data = this.regroupData(res.data);
        this._loading = false;
        this._total = res.pageDataCount;
      },rej=>{  this._loading = false; });
  }

  // 获取所有岗位
  getPost() {
    var developList,testUserList,productUserList;
    // this._options = [];
    
    const parallel$ = Observable.forkJoin(
      this.addTaskService.getDevelopUser(this.webId),
      this.addTaskService.getTestUser(this.webId),
      this.addTaskService.getProductUser(this.webId)
    );

    parallel$.subscribe( (values:any) =>{
      this._options = [];
      this._options.push(
        this.pushPost('','开发',this.transitionArray(values[0])),
        this.pushPost('','测试',this.transitionArray(values[1])),
        this.pushPost('','产品',this.transitionArray(values[2])),
      )
    });
  }



  pushPost(val,label,child):any{
    return {
      value: val,
      label: label,
      children:child
    }
  }

  transitionArray(data) {
    const arr = data;
    if(!Array.isArray(arr)){
        return;
    }
    if(arr.length == 0){return};
    arr.forEach(item => {
      item['value'] = item['userId'];
      item['label'] = item['userName'];
      item['isLeaf'] = true
      
      delete item['user'];
      delete item['userName'];
    });
    return arr;
  }


  loadTable() {
    this.workOrderService.getWaitTask(this.userList.id,this.userList.webId).subscribe((res:any) => {
      this._data = this.regroupData(res);
    })
  }


  regroupData(data) {
    data.forEach((ele:waitTaskInfo) => {

      ele.testFinish = ele.testFinish + '000';
      // ele['testFinish'] = ele['testFinish'] + '000';
      
      ele.testStart = ele.testStart + '000';
      // ele['testStart'] = ele['testStart'] + '000';
      
      ele.type == 201 ?  ele.devFinish = '' :  ele.devFinish = ele.devFinish + '000';
      // ele.type == 201 ?  ele['devFinish'] = '' :  ele['devFinish'] = ele['devFinish'] + '000';

      ele.createData = ele.createData + '000';
      // ele['createData'] = ele['createData'] + '000';
      
      ele.type == 201 ?  ele.acceptFinish = '' :  ele.acceptFinish = ele.acceptFinish + '000';
      // ele.type == 201 ?  ele['acceptFinish'] = '' :  ele['acceptFinish'] = ele['acceptFinish'] + '000';
      

      this.taskType == '1' ?  ele['isBtn'] = true :  ele['isBtn'] = false;
      this.taskType == '3' ?  ele['isEdit'] = true :  ele['isEdit'] = false;
      ele.type == 200 ? ele.type = '需求' : ele.type = 'BUG' ;
      ele['editDisabled'] = true;
      if(ele.todoStatusId ==102 || ele.todoStatusId ==108){
        if(this.userPost==102){
          ele['editDisabled'] = false;
        }
      }else if(this.userPost == ele.todoStatusId){
        ele['editDisabled'] = false;
      }

      if(this.taskType == '3'){
        ele['editDisabled'] = false;
      }

      this.valService.getDownState().forEach((item)=>{
        if(ele.todoStatusId == item.value){
          ele['todoStatusStr'] = item.label;
        }
      });

      switch (ele.todoStatusStr) {
        case '开发':
          ele['taskUserList'] = this.getDuty(ele.taskUserList,1);
          if(ele.type == '需求'){
            Number(ele.devFinish) - Date.parse(String(new Date())) >= 0 ? ele['isPostpone'] = false : ele['isPostpone'] = true;
          }else{
            Number(ele.testStart) - Date.parse(String(new Date())) >= 0 ? ele['isPostpone'] = false : ele['isPostpone'] = true;
          }
          break;
        case '联调':
          ele['taskUserList'] = this.getDuty(ele.taskUserList,2);
          if(ele.type == '需求'){
            Number(ele.testStart) - Date.parse(String(new Date())) >= 0 ? ele['isPostpone'] = false : ele['isPostpone'] = true;
          }
          break;
        case '测试':
          ele['taskUserList'] = this.getDuty(ele.taskUserList,3);
          Number(ele.testFinish) - Date.parse(String(new Date())) >= 0 ? ele['isPostpone'] = false : ele['isPostpone'] = true;
          break;
        case '产品':
          ele['taskUserList'] = this.getDuty(ele.taskUserList,4);
          if(ele.type == '需求'){
            Number(ele.acceptFinish) - Date.parse(String(new Date())) >= 0 ? ele['isPostpone'] = false : ele['isPostpone'] = true;
          }
          break;
        default:
          ele['taskUserList'] = this.getDuty([],0)
          ele['isPostpone'] = false;
          break;
      }


    });
    return data;
  }


  getDuty(data,duty) {
    let array: any = [];
    data.forEach(element => {
      if(element.duty == duty){
        let status;
        element.status == 0 ? status = '进行中' : status = '开发完成'
        array.push({userName:element.userName,status: status,statusId:element.status,userId:element.userId});
      }
    });
    return array
  }
  
  skipTaskFlow(data) {
    if(data.todoStatusId == 108){
      this.router.navigate(["task/addTaskFlow",{taskId:data.id, todoStatusId:data.todoStatusId,users:JSON.stringify(data.taskUserList)}])
      return;      
    }
    this.AddTaskFlowService.getCurrentDuty(data.id,this.userList.id,data.webId).subscribe((res:any)=>{
      if(res.length > 0){
        const duty = res[res.length - 1 ].duty;
        if(res.length == 1){
          if(duty == 2 && data.todoStatusId == 102){
            this.error();
            return
          }
        }
      }
      this.router.navigate(["task/addTaskFlow",{taskId:data.id, todoStatusId:data.todoStatusId,users:JSON.stringify(data.taskUserList)}])
    })
  }

  error() {
    this.confirmServ.error({
      title: '提示',
      content: '当前已是待联调状态请勿重复操作！'
    });
  }

  skipProcessFlow(data) {
    this.router.navigate(["task/processFlow",{taskId:data.id}])
  }


  getCurrentPost() {
    this.workOrderService.getCurrentPost(this.userList.id,this.userList.webId).subscribe( (res:any)=> {
      this.userPost = res.postId;
      this.loadTable();
    })
  }

  extension(data) {
    this.router.navigate(["task/addTask",{taskId:data.id, todoStatusId:data.todoStatusId,state:'edit'}])
  }

  // 删除
  delete = (data)=> {
    var self = this;
    this.confirmServ.confirm({
        title  : '提示',
        content: '<b>确定删除次任务么</b>',
        onOk(){
            self.workOrderService.delete(data.id).subscribe(res=>{
                self.searchTask(false);
            })
        }
      });
  }

}
