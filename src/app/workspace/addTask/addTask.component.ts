import { Component, OnInit, DoCheck } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ValueService } from "../../service/value.service";
import * as $ from "jQuery";
@Component({
  selector: "app-addTask",
  templateUrl: "./addTask.component.html",
  styleUrls: ["./addTask.component.scss"]
})
export class AddTaskComponent implements OnInit {
  validateForm: FormGroup;

  createUserId: string; //登陆人id
  webId: string; //登陆后
  title: string;
  productId = "";
  projectId = "";
  versionId = "";

  devFinish: string; //联调时间
  testStart: string; //提测时间
  testFinish: string; // 测试完成时间
  acceptFinish: string; // 验收完成时间
  description: string;
  type = "200"; //任务类型（200需求，201bug）
  multipleSelected: any;

  workLoad = "";
  taskFile: any; //附件

  workLoadList = [];

  // isVisible 模态框modal
  isProduct = false;
  isProject = false;
  isVersion = false;

  isLoading = false;
  isTaskState = true;
  selectedMultipleOption;

  newData = [];
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
  constructor(private valueService: ValueService, private fb: FormBuilder) {
    // this.selectedMultipleOption = [ '1', '5' ];
    this.workLoadList = this.valueService.Days;
  }

  selectMenu = null;

  ngOnInit() {
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
      multipleSelect: [null, [Validators.required]],
    });



  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }


  save() {
    let taskUserList = [];
    console.log(this.validateForm)

    // this.isLoading = true;
    // console.log(this.createUserId,this.title,this.description,this.projectId,
    //   this.versionId,this.productId,this.workLoad,this.type,this.devFinish,this.testStart,
    //   this.testFinish,this.acceptFinish,this.webId,this.taskFile)
    //获取任务数组
    console.log(this.multipleSelected);
    const $dats = $(".days");
    if ($dats.length > 1) {
      this.multipleSelected.forEach((item, index) => {
        console.log($dats[index].value);
        taskUserList.push({
          userId: item.value,
          duty: item.label,
          userWork: $dats[index].value
        });
      });
      console.log(taskUserList);
    }
  }

  /**
   * 改变任务类型切换tab
   */
  changeTask() {
    this.type == "200" ? (this.isTaskState = true) : (this.isTaskState = false);
  }
}
