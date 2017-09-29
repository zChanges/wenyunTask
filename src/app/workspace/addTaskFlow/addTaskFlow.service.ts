import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { RouterService } from "./../../service/router.service";
import { Http, HttpModule } from "@angular/http";

@Injectable()
export class AddTaskFlowService {
  baseUrl: string;
  constructor(private routerService: RouterService, private http: HttpClient) {
    this.baseUrl = this.routerService.baseUrl;
  }

  /**
   * 获取职责
   * @param taskId 任务ID
   * @param userId 用户id
   * @param webId 
   */
  getCurrentDuty(taskId, userId, webId) {
    return this.http.get(
      this.baseUrl + `task/getCurrentDuty?taskId=${taskId}&userId=${userId}&webId=${webId}`
    );
  }

  /**
   * 移交：获取相同岗位list
   * @param userId 用户id
   * @param webId 
   */
  getSamePostUser(userId, webId) {
    return this.http.get(
      this.baseUrl + `user/getSamePostUser?userId=${userId}&webId=${webId}`
    );
  }

  /**
   * 生成任务流程
   * @param taskId 任务id-主任务id获取
   * @param createUserId 
   * @param title 标题
   * @param description 描述
   * @param todoStatusId 全部状态id-主任务获取
   * @param status 状态(0未通过，1通过，2移交)
   */
  createTaskProcess (taskId: string, createUserId: string, title: string, description: string, todoStatusId: string, status: string,fileId) {
    return this.http.get(
      this.baseUrl + `taskProcess/createTaskProcess?taskId=${taskId}&createUserId=${createUserId}
      &title=${title}&description=${description}&todoStatusId=${todoStatusId}&status=${status}&fileId=${fileId}`
    );
  }

  /**
   * 移交
   */
  handNewUser(oldUserId,newUserId,taskId) {
    return this.http.get(
      this.baseUrl + `task/handNewUser?oldUserId=${oldUserId}&newUserId=${newUserId}&taskId=${taskId}`
    );
  }

  /**
   * 处理-通过
   */
  changeSuccessStatus(taskId,userId,taskStatus,webId) {
    return this.http.get(
      this.baseUrl + `task/changeSuccessStatus?pass=1&taskId=${taskId}&userId=${userId}&taskStatus=${taskStatus}&webId=${webId}`
    );
  }

  /**
   * 不通过-获取人员
   */
  getPreDutyUser(taskId,duty,webId,taskType) {
    return this.http.get(
      this.baseUrl + `user/getPreDutyUser?taskId=${taskId}&duty=${duty}&webId=${webId}&taskType=${taskType}`
    );
  }

  /**
   * 不通过
   */
  changeFailStatus(taskId,preDuty,strUserId,taskStatus,webId,taskType) {
    return this.http.get(
      this.baseUrl + `task/changeFailStatus?pass=0&taskId=${taskId}&preDuty=${preDuty}
      &strUserId=${strUserId}&taskStatus=${taskStatus}&webId=${webId}&taskType=${taskType}`
    );
  }

}
