import { ValueService } from './../../service/value.service';
import { Component, OnInit } from '@angular/core';
import { ProcessFlowService } from './processFlow.service';
import {ActivatedRoute} from "@angular/router";
import { AddTaskService } from './../addTask/addTask.service';

@Component({
  selector: 'app-processFlow',
  templateUrl: './processFlow.component.html',
  styleUrls: ['./processFlow.component.scss']
})
export class ProcessFlowComponent implements OnInit {

  taskId = '';
  detialData:any = {};
  isBug = true;
  bug = false;
  todoStatus = 0;
  user;
  duty1 = [];
  duty2 = [];
  duty3 = [];
  duty4 = [];
  data = [
    {
      key    : 0,
      name   : 'Edward King 0',
      age    : 32,
      address: 'London, Park Lane no. 0',
    }
  ];

  constructor(private processFlowService: ProcessFlowService,
    private activatedRoute: ActivatedRoute,
    private valService: ValueService,
    private addTaskService: AddTaskService,
    private AddTaskService: AddTaskService
  ) {
    this.activatedRoute.params.subscribe( res => {
      this.taskId = res.taskId;
    });

    this.user = JSON.parse(window.localStorage.getItem('user'));
  }



  ngOnInit() {

    this.processFlowService.getTask(this.taskId).subscribe( (res:any)=>{
      res['createData'] = res['createData'] + '000';
      res['acceptFinish'] = res['acceptFinish'] + '000';
      res['testStart'] = res['testStart'] + '000';
      res['testFinish'] = res['testFinish'] + '000';
      res['devFinish'] = res['devFinish'] + '000';
      
      if(res.type == 200){
        res.type = '需求'
      }else{
        res.type = 'BUG';
        this.bug = true;
        this.isBug = false;
      }
      this.todoStatus = Number(res.todoStatusId);
      if(Number(this.todoStatus) == 108){ this.todoStatus = 102.5; };
      this.valService.getDownState().forEach((item)=>{
        if(res.todoStatusId == item.value){
          res['todoStatusStr'] = item.label;
        }
      });

      //rilegou 获取产品,版本,项目.
      this.addTaskService.getProduct(this.user.webId).subscribe((data:any)=>{
        data.forEach(item => {
          if(item.id==res.productId){
             res['productStr'] = item.name;
          }
        });
      })

      this.addTaskService.getProject(this.user.webId).subscribe((data:any)=>{
        data.forEach(item => {
          if(item.id==res.projectId){
             res['projectStr'] = item.name;
          }
        });
      })

      this.addTaskService.getProjectVersion(this.user.webId).subscribe((data:any)=>{
        data.forEach(item => {
          if(item.id==res.versionId){
             res['versionStr'] = item.name;
          }
        });
      })
      this.detialData = res;
    })


    this.AddTaskService.getTaskUserList(this.taskId).subscribe( (res:any)=>{
      res.forEach(element => {
        switch (element.duty) {
          case 1:
            this.duty1.push(element.userName)
            break;
          case 2:
          this.duty2.push(element.userName)
            break;
          case 3:
          this.duty3.push(element.userName)
            break;
          case 4:
          this.duty4.push(element.userName)
            break;
          default:
            break;
        }
      });
    });


    this.processFlowService.getTaskProcess(this.taskId).subscribe( (res:any)=>{
      // this.data = res;
      if(!res){res=[];};
      this.data = this.regroupData(res);
    })

  }


  regroupData(data) {
    data.forEach(ele => {
      ele['createData'] = ele['createData'] + '000';
      ele['expand'] = true;
      ele.type == 200 ? ele.type = '需求' : ele.type = 'BUG' ;
      if(ele['status'] == 0){
        ele['statusStr'] = '打回'
      }else if(ele['status'] == 1){
        ele['statusStr'] = '通过'
      }else if(ele['status'] == 2){
        ele['statusStr'] = '移交'
      }
      this.valService.getDownState().forEach((item)=>{
        if(ele.todoStatusId == item.value){
          ele['todoStatusStr'] = item.label;
        }
      });
    });
    return data;
  }

  getProduct(){
    
  }


  getFile(fileId){
    this.processFlowService.getFile(fileId);
  }

}
