import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RouterService } from './../../service/router.service';

@Injectable()
export class AddTaskService {
    baseUrl:string;
    constructor(private http: HttpClient, private routerService: RouterService) { 
        this.baseUrl = routerService.baseUrl;
    }


    /**
     * 保存主任务单，返回task_id
     * @param createUserId 登陆人id
     * @param title 标题
     * @param description 描述 
     * @param projectId  工程id
     * @param versionId  版本id
     * @param productId  产品id
     * @param workLoad   工作量
     * @param type       任务类型   
     * @param devFinish  联调时间
     * @param testStart  提测时间
     * @param testFinish  测试完成时间
     * @param acceptFinish  验收完成时间
     * @param webId 
     * @param taskFile   任务文件
     */
    createTask(createUserId,title,description,projectId,versionId,productId,workLoad,type,devFinish,testStart,testFinish,acceptFinish,webId,fileId) {
    // createTask() {
        return this.http.get(this.baseUrl+`task/createTask?createUserId=${createUserId}&title=${title}&description=${description}&projectId=${projectId}
        &versionId=${versionId}&productId=${productId}&workLoad=${workLoad}&type=${type}&devFinish=${devFinish}
        &testStart=${testStart}&testFinish=${testFinish}&acceptFinish=${acceptFinish}&webId=${webId}&fileId=${fileId}`);

        // return this.http.post(this.baseUrl+`task/createTask`,{
        //     createUserId:createUserId,
        //     title:title,
        //     description:description,
        //     projectId:projectId,
        //     versionId:versionId,
        //     productId:productId,
        //     workLoad:workLoad,
        //     type:type,
        //     devFinish:devFinish,
        //     testStart:testStart,
        //     testFinish:testFinish,
        //     acceptFinish:acceptFinish,
        //     webId:webId,
        //     fileId:fileId
        // }
        // );
        
    }

    /**
     * 保存任务单中的人员和工作量
     * @param taskId 
     * @param type  任务类型
     * @param webId 
     * @param createUser 
     * @param taskUser 
     */
    saveTaskUser(taskId,type,webId,createUser,taskUser){
        return this.http.get(this.baseUrl+`task/saveTaskUser?taskId=${taskId}&type=${type}
        &webId=${webId}&createUser=${createUser}&taskUser=${taskUser}`
        // ,{
        //     taskId:taskId,
        //     type:type,
        //     webId:webId,
        //     createUser:createUser,
        //     taskUser:taskUser
        // }
        );
    }

    /**
     * 产品
     */
    getProduct(webId) {
        return this.http.get(
            this.routerService.baseUrl + `product/getProduct?webId=${webId}`)
    }

    /**
     * 获取所有项目
     */
    getProject(webId) {
        return this.http.get(
            this.routerService.baseUrl + `project/getProject?webId=${webId}`)
    }

    /**
     * 获取所有版本
     */
    getProjectVersion(webId) {
        return this.http.get(
            this.routerService.baseUrl + `projectVersion/getProjectVersion?webId=${webId}`)
    }


    
    /**
     * 获取开发人
     */
    getDevelopUser(webId) {
        return this.http.get(
            this.routerService.baseUrl + `user/getDevelopUser?webId=${webId}`)
    }

    /**
     * 获取测试人
     */
    getTestUser(webId) {
        return this.http.get(
            this.routerService.baseUrl + `user/getTestUser?webId=${webId}`)
    }

    /**
     * 获取产品人
     */

    getProductUser(webId){
        return this.http.get(
            this.routerService.baseUrl + `user/getProductUser?webId=${webId}`)
    }

  
}