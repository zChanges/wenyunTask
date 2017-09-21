import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
@Component({
  selector: 'app-addTask',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.scss']
})
export class AddTaskComponent implements OnInit {
  validateForm:FormBuilder;
  inputValue:string;
  radioValue = 'A'
  isLoading = false;
  selectedMultipleOption;
  isTaskState = true;
  constructor() { }

  searchOptions = [
    { value: '1', label: '杰克1' },
    { value: '2', label: '露2' },
    { value: '3', label: '汤姆3' },
    { value: '4', label: '杰克4' },
    { value: '5', label: '露西5' },
    { value: '6', label: '汤姆6' },
    { value: '7', label: '杰克7' },
    { value: '8', label: '露西8' },
    { value: '9', label: '汤姆9' }
  ]

  ngOnInit() {
  }


  save(){
    this.isLoading = true;
  }

  changeTask() {
    this.radioValue == 'A' ? this.isTaskState = true : this.isTaskState = false;
  }
}
