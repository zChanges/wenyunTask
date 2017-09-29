import { ValueService } from './../../service/value.service';
import { Component, OnInit } from '@angular/core';
import { ProcessFlowService } from './processFlow.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-processFlow',
  templateUrl: './processFlow.component.html',
  styleUrls: ['./processFlow.component.scss']
})
export class ProcessFlowComponent implements OnInit {

  taskId = '';
  detialData = '';
  data = [
    {
      key    : 0,
      name   : 'Edward King 0',
      age    : 32,
      address: 'London, Park Lane no. 0',
    }
  ];
  searchOptions = [
    { value: "1", label: "杰克1" },
    { value: "2", label: "露2" },
    { value: "3", label: "汤姆3" },
    { value: "4", label: "杰克4" },
    { value: "5", label: "露西5" },
    { value: "6", label: "汤姆6" },
    { value: "7", label: "杰克7" },
    { value: "8", label: "露西8" },
    { value: "9", label: "汤姆9" }
  ];
  constructor(private processFlowService: ProcessFlowService,
    private activatedRoute: ActivatedRoute,
    private valService: ValueService
  ) {
    this.activatedRoute.params.subscribe( res => {
      this.taskId = res.taskId;
    });

  }

  ngOnInit() {

    this.processFlowService.getTask(this.taskId).subscribe( (res:any)=>{
      console.log(res);
      this.detialData = res;
    })

    this.processFlowService.getTaskProcess(this.taskId).subscribe( (res:any)=>{
      // this.data = res;
      this.data = this.regroupData(res);
    })

  }


  regroupData(data) {
    data.forEach(ele => {
      // ele['testStart'] = ele['testStart'] + '000';
      // ele['testFinish'] = ele['testFinish'] + '000';
      // ele['devFinish'] = ele['devFinish'] + '000';
      // ele['acceptFinish'] = ele['acceptFinish'] + '000';
      ele['createData'] = ele['createData'] + '000';

      ele.type == 200 ? ele.type = '需求' : ele.type = 'BUG' ;

      this.valService.getDownState().forEach((item)=>{
        if(ele.todoStatusId == item.value){
          ele['todoStatusStr'] = item.label;
        }
      });
    });
    return data;
  }


}
