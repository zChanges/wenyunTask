import { ValueService } from './../../service/value.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { AddTaskService } from './../addTask/addTask.service';
import { WorkOrderService } from './workOrder.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import { ActivatedRoute, Router, Params } from '@angular/router';
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
  startTime = ''; // 开始时间
  finishTime = ''; // 结束时间
  taskStateList = [];
  taskStatus = ''; // 状态
  productId = ''; // 产品id
  projectId = '';
  versionId = '';
  taskUserId = '';
  type = ''; //类型

  isDisabled = true;


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
    private router: Router
  ) {
    this.userList = JSON.parse(window.localStorage.getItem('user'))
    this.webId = this.userList.webId;
  }

  ngOnInit() {
    this.getDownLoad();
    this.getPost();
    this.loadTable();
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
    }

  }

  searchTask () {
      switch (this.taskType) {
        case '1':// 待处理
          this.workOrderService.getWaitTask(this.userList.id,this.userList.webId).subscribe(res => {
              this._data = this.regroupData(res);
          })
          break;
        case '2':// 本周已处理
          this.workOrderService.getAlreadyDeal(this.userList.id,this.userList.webId).subscribe(res => {
            this._data = this.regroupData(res);
          })
          break;
        case '3':// 由我创建，
        case '4':// 已关闭
          this.workOrderService.getTaskByProperty(this.userList.id,this.startTime,this.finishTime,
            this.taskStatus,this.productId,this.projectId,this.versionId,
            this.taskUserId[1],this.userList.webId,this.type).subscribe(res => {
              this._data = this.regroupData(res);
          })
          break;
        default:
          break;
      }
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
    data.forEach(ele => {
      ele['testStart'] = ele['testStart'] + '000';
      ele['testFinish'] = ele['testFinish'] + '000';
      ele['devFinish'] = ele['devFinish'] + '000';
      ele['createData'] = ele['createData'] + '000';
      ele['acceptFinish'] = ele['acceptFinish'] + '000';

      ele.type == 200 ? ele.type = '需求' : ele.type = 'BUG' ;

      this.valService.getDownState().forEach((item)=>{
        if(ele.todoStatusId == item.value){
          ele['todoStatusStr'] = item.label;
        }
      });

      switch (ele.todoStatusId) {
        case '开发':
          ele.devFinish - Date.parse(String(new Date())) >= 0 ? ele['isPostpone'] = false : ele['isPostpone'] = true;
          break;
        case '联调':
          ele.testStart - Date.parse(String(new Date())) >= 0 ? ele['isPostpone'] = false : ele['isPostpone'] = true;
          break;
        case '测试':
          ele.devFinish - Date.parse(String(new Date())) >= 0 ? ele['isPostpone'] = false : ele['isPostpone'] = true;
          break;
        case '产品':
          ele.acceptFinish - Date.parse(String(new Date())) >= 0 ? ele['isPostpone'] = false : ele['isPostpone'] = true;
          break;
        default:
          ele['isPostpone'] = false;
          break;
      }




    });
    console.log(data)
    return data;
  }
  
  skipTaskFlow(data) {
    this.router.navigate(["task/addTaskFlow",{taskId:data.id, todoStatusId:data.todoStatusId}])
  }

  skipProcessFlow(data) {
    this.router.navigate(["task/processFlow",{taskId:data.id}])
  }

}
