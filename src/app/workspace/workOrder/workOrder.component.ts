import { ValueService } from './../../service/value.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { AddTaskService } from './../addTask/addTask.service';
import { WorkOrderService } from './workOrder.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

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
  startTime; // 开始时间
  finishTime; // 结束时间
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
          value: "2-1",
          label: "2-1",
          isLeaf: true
        },
        {
          value: "2-2",
          label: "2-2",
          isLeaf: true
        }
      ]
    }
  ];

  data = [
    {
      key    : 0,
      name   : 'Edward King 0',
      age    : 32,
      address: 'London, Park Lane no. 0',
    }
  ];
  constructor(private fb: FormBuilder,private addTaskService: AddTaskService, private valService:ValueService, private workOrderService: WorkOrderService) {
    this.userList = JSON.parse(window.localStorage.getItem('user'))
    this.webId = this.userList.webId;
  }

  ngOnInit() {
    this.getDownLoad();
    this.getPost();
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
            console.log(res);
          })
          break;
        case '2':// 本周已处理
          this.workOrderService.getAlreadyDeal(this.userList.id,this.userList.webId).subscribe(res => {
            console.log(res);
          })
          break;
        case '3':// 由我创建，
        case '4':// 已关闭
          this.workOrderService.getTaskByProperty(this.userList.id,this.startTime,this.finishTime,
            this.taskStatus,this.productId,this.projectId,this.versionId,
            this.taskUserId,this.userList.webId,this.type).subscribe(res => {
            console.log(res);
          })
          break;
        default:
          break;
      }
  }

  // 获取所有岗位
  getPost() {
    var developList,testUserList,productUserList;
    this._options = [];
    
    const parallel$ = Observable.forkJoin(
      this.addTaskService.getDevelopUser(this.webId),
      this.addTaskService.getTestUser(this.webId),
      this.addTaskService.getProductUser(this.webId)
    );

    parallel$.subscribe(values => {

      this._options.push(
        this.pushPost('','开发',values[0]),
        this.pushPost('','测试',values[1]),
        this.pushPost('','产品',values[2]),
      )
      console.log(this._options)
    });

    

  }

  pushPost(val,label,child) {
    return {
      value: val,
      label: label,
      children:child
    }
  }


  

}
