import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { RouterService } from './../../service/router.service';

@Injectable()
export class AddTaskService {
    baseUrl:string;
    constructor(private http:Http, private routerService: RouterService) { 
        this.baseUrl = routerService.baseUrl;
    }

    /**
     * 保存主任务单，返回task_id
     */
    createTask(createUserId,title,description,projectId,versionId,productId,workLoad,type,devFinish,testStart,testFinish,acceptFinish,webId,taskFile) {
        return this.http.post(this.baseUrl+`task/createTask`,{
            createUserId:createUserId,
            title:title,
            description:description,
            projectId:projectId,
            versionId:versionId,
            productId:productId,
            workLoad:workLoad,
            type:type,
            devFinish:devFinish,
            testStart:testStart,
            testFinish:testFinish,
            acceptFinish:acceptFinish,
            webId:webId,
            taskFile:taskFile
        });
        
    }

    /**
     * 保存任务单中的人员和工作量
     */
    saveTaskUser(taskId,type,webId,createUser,taskUser){
        return this.http.post(this.baseUrl+`task/saveTaskUser`,{
            taskId:taskId,
            type:type,
            webId:webId,
            createUser:createUser,
            taskUser:taskUser
        });
    }

    /**
     * 获取所有产品
     */
    getProduct() {
        return this.http.get(
            this.routerService.baseUrl + `product/getProduct`)
        
    }

    /**
     * 获取所有项目
     */
    getProject() {
        return this.http.get(
            this.routerService.baseUrl + `project/getProject`)
    }

    /**
     * 获取所有版本
     */
    getProjectVersion() {
        return this.http.get(
            this.routerService.baseUrl + `projectVersion/getProjectVersion`)
    }


    
    /**
     * 获取开发人
     */
    getDevelopUser() {
        return this.http.get(
            this.routerService.baseUrl + `user/getDevelopUser`)
    }

    /**
     * 获取测试人
     */
    getTestUser() {
        return this.http.get(
            this.routerService.baseUrl + `user/getTestUser`)
    }

    /**
     * 获取产品人
     */

    getProductUser(){
        return this.http.get(
            this.routerService.baseUrl + `user/getProductUser`)
    }

  
}