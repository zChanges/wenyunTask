import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-workOrder",
  templateUrl: "./workOrder.component.html",
  styleUrls: ["./workOrder.component.scss"]
})
export class WorkOrderComponent implements OnInit {
  isSearch = false;
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
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
