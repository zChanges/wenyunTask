import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
@Component({
  selector: "app-addTaskFlow",
  templateUrl: "./addTaskFlow.component.html",
  styleUrls: ["./addTaskFlow.component.scss"]
})
export class AddTaskFlowComponent implements OnInit {
  validateForm: FormGroup;
  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef) {}

  title: string;
  description: string;

  isDispose = false;
  isLoading =  false;
  isPass = true ;

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

  searchOptionss = [
    { id: "1", name: "杰克1" },
    { id: "2", name: "露2" },
    { id: "3", name: "汤姆3" },
    { id: "4", name: "杰克4" },
    { id: "5", name: "露西5" },
    { id: "6", name: "汤姆6" },
    { id: "7", name: "杰克7" },
    { id: "8", name: "露西8" },
    { id: "9", name: "汤姆9" }
  ];

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
      people: [null, [Validators.required]]
    });
  }

  _log(value) {
    console.log(value);
  }

  save() {
    console.log(this.validateForm)
  }

  setDispose(value) {
    // 切换后会触发变换检测，多次修改了一个值，产生报错，切换不应该触发变化检测。通过detectChanges()修改
    this.isDispose= value;
    this.cdr.detectChanges();
  }
  
}
