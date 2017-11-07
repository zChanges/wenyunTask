import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {

constructor() { }
    /**
     * 工作量
     */
    Days = [
        {value:1,text:'1天'},{value:2,text:'2天'},
        {value:3,text:'3天'},{value:4,text:'4天'},
        {value:5,text:'5天'},{value:6,text:'6天'},
        {value:7,text:'7天'},{value:8,text:'8天'},
        {value:9,text:'9天'},{value:10,text:'10天'},
        {value:11,text:'11天'},{value:12,text:'12天'},
        {value:13,text:'13天'},{value:14,text:'14天'},
        {value:15,text:'15天'},{value:16,text:'16天'},
        {value:17,text:'17天'},{value:18,text:'18天'},
        {value:19,text:'19天'},{value:20,text:'20天'},
        {value:21,text:'21天'},{value:22,text:'22天'},
        {value:23,text:'23天'},{value:24,text:'24天'},
        {value:25,text:'25天'},{value:26,text:'26天'},
        {value:27,text:'27天'},{value:28,text:'28天'},
        {value:29,text:'29天'},{value:30,text:'30天'}
    ];

    /**
     * 任务单类型
     */
    getDownTaskType() {
        return  [
            { value: "1", label: "待处理任务" },
            { value: "2", label: "本周已处理任务" },
            { value: "3", label: "我的创建" },
            { value: "4", label: "查询所有" }
        ]
    }

    /**
     * 状态
     */
    getDownState(){
        return [
            { value: "102", label: "开发" },
            { value: "108", label: "联调" },
            { value: "103", label: "测试" },
            { value: "105", label: "产品" },
            { value: "106", label: "关闭" },
            { value: "107", label: "未关闭" }
        ]
    }

    /**
     * Task类型 
     * 需求 200
     * bug 201
     */
    getDownType(){
        return [
            { value: "200", label: "需求" },
            { value: "201", label: "BUG" },
        ]
    }

}