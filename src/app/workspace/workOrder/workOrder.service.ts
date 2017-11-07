import { Injectable } from "@angular/core";
import { RouterService } from "./../../service/router.service";
import { HttpClient } from '@angular/common/http';
import { PublicMethodService } from './../../service/publicMethod.service';


@Injectable()
export class WorkOrderService {
  baseUrl: string;
  constructor(private routerSerivce: RouterService, private http: HttpClient, private publicMethodService: PublicMethodService) {
      this.baseUrl = this.routerSerivce.baseUrl;
  }

  /**
   * 查询待处理
   */
  getWaitTask(userId, webId) {
    return this.http.get(this.baseUrl + `task/getWaitTask?userId=${userId}&webId=${webId}`);
  }

  /**
   * 本周已处理
   */
  getAlreadyDeal(userId,del) {
    del = 0;
    return this.http.get(this.baseUrl + `task/getAlreadyDeal?userId=${userId}&del=${del}`);
  }

  /**
   * 由我创建，已关闭，未关闭
   */
  getTaskByProperty(createUserId,startTime,finishTime,taskStatus,productId,projectId,versionId,taskUserId,webId,taskType,pageNumber,pageSize,title){
    return this.http.get(
        this.baseUrl + `task/getTaskByProperty?createUserId=${createUserId}&startTime=${this.publicMethodService.dateUTC(startTime)}&finishTime=${this.publicMethodService.dateUTC(finishTime)}&taskStatus=${taskStatus}
        &productId=${productId}&projectId=${projectId}&versionId=${versionId}&taskUserId=${taskUserId}&webId=${webId}&taskType=${taskType}&pageNumber=${pageNumber}&pageSize=${pageSize}&title=${title}`
    );
  }


  /**
   * 获取当前人岗位userPost
   */

  getCurrentPost(userId,webId) {
    return this.http.get(this.baseUrl + `user/getCurrentPost?userId=${userId}&webId=${webId}`);
  }


  delete(taskId){
      return this.http.get(this.baseUrl + `task/deleteTask?taskId=${taskId}`);
  }


}
