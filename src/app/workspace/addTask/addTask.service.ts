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


    /****************
     *   编 辑 接 口
     *****************/


     /**
      * 获取task
      */
    getCommonTask(taskId){
        return this.http.get(
            this.routerService.baseUrl + `task/getCommonTask?taskId=${taskId}`)
    }

    /**
     * 根据taskId获取职责，人员，工作量等
     */
    getTaskUserList(taskId){
        return this.http.get(
            this.routerService.baseUrl + `task/getTaskUserList?taskId=${taskId}`)
    }

    /**
     * 编辑更新task
     */
    editTask(id,devFinish,testStart,testFinish,acceptFinish,webId ){
        return this.http.get(
            this.routerService.baseUrl + `task/editTask?id=${id}&devFinish=${devFinish}&testStart=${testStart}
            &testFinish=${testFinish}&acceptFinish=${acceptFinish}&webId=${webId}`)
    }


    /****************
     *   修改删除 产品、项目
     *****************/

     /**
      * 修改产品
      */
    updateProduct(code,userId,id) {
        return this.http.get(
            this.routerService.baseUrl + `product/updateProduct?code=${code}&name=${code}&userId=${userId}&id=${id}&del=0`)
    }
    
    /**
     * 添加产品
     */
    addProduct(code,userId) {
        return this.http.get(
            this.routerService.baseUrl + `product/addProduct?code=${code}&name=${code}&userId=${userId}`)
    }

    /**
     * 删除产品
     */
    delProduct(userId,id) {
        return this.http.get(
            this.routerService.baseUrl + `product/updateProduct?userId=${userId}&id=${id}&del=1`)
    }




    /**
      * 修改项目
      */
      updateProject(code,userId,id) {
        return this.http.get(
            this.routerService.baseUrl + `project/updateProject?code=${code}&name=${code}&userId=${userId}&id=${id}&del=0`)
    }
    
    /**
     * 添加项目
     */ 
    addProject(code,userId) {
        return this.http.get(
            this.routerService.baseUrl + `project/addProject?code=${code}&name=${code}&userId=${userId}`)
    }

    /**
     * 删除项目
     */
    delProject(userId,id) {
        return this.http.get(
            this.routerService.baseUrl + `project/updateProject?userId=${userId}&id=${id}&del=1`)
    }


    

    /**
      * 修改版本
      */
      updateprojectVersion(code,userId,id) {
        return this.http.get(
            this.routerService.baseUrl + `projectVersion/updateProjectVersion?code=${code}&name=${code}&userId=${userId}&id=${id}&del=0`)
    }
    
    /**
     * 添加版本
     */ 
    addprojectVersion(code,userId) {
        return this.http.get(
            this.routerService.baseUrl + `projectVersion/addProjectVersion?code=${code}&name=${code}&userId=${userId}`)
    }

    /**
     * 删除版本
     */
    delprojectVersion(userId,id) {
        return this.http.get(
            this.routerService.baseUrl + `projectVersion/updateProjectVersion?userId=${userId}&id=${id}&del=1`)
    }


      
  
}