import { Injectable } from "@angular/core";
import { RouterService } from "./../../service/router.service";
import { Http, HttpModule } from "@angular/http";

@Injectable()
export class AddTaskFlowService {
  baseUrl: string;
  constructor(private routerService: RouterService, private http: Http) {
    this.baseUrl = this.routerService.baseUrl;
  }

  /**
   * 获取职责
   * @param taskId 任务ID
   * @param userId 用户id
   * @param webId 
   */
  getCurrentDuty(taskId, userId, webId) {
    this.http.get(
      this.baseUrl + `task/getCurrentDuty?taskId=${taskId}&userId=${userId}&webId=${webId}`
    );
  }

  /**
   * 移交：获取相同岗位list
   * @param userId 用户id
   * @param webId 
   */
  getSamePostUser(userId, webId) {
    this.http.get(
      this.baseUrl + `task/getSamePostUser?userId=${userId}&webId=${webId}`
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
  createTaskProcess (taskId: string, createUserId: string, title: string, description: string, todoStatusId: string, status: string) {
    this.http.get(
      this.baseUrl + `askProcess/createTaskProcess?taskId=${taskId}&createUserId=${createUserId}
      &title=${title}&description=${description}&todoStatusId=${todoStatusId}&status=${status}`
    );
  }
}
