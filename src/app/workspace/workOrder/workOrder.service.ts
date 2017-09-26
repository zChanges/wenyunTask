import { Injectable } from "@angular/core";
import { Http, HttpModule } from "@angular/http";
import { RouterService } from "./../../service/router.service";

@Injectable()
export class WorkOrderService {
  baseUrl: string;
  constructor(private routerSerivce: RouterService, private http: Http) {
      this.baseUrl = this.routerSerivce.baseUrl;
  }

  /**
   * 查询待处理
   */
  getWaitTask(userId, webId) {
    return this.http.get(this.baseUrl + `task/getAlreadyDeal?userId=${userId}&webId=${webId}`);
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
  getTaskByProperty(createUserId,createTime,taskStatus,productId,projectId,versionId,taskUserId,webId,taskType,pageNumber, pageSize, taskCount){
    return this.http.get(
        this.baseUrl + `task/getTaskByProperty?createUserId=${createUserId}&createTime=${createTime}&taskStatus=${taskStatus}
        &productId=${productId}&projectId=${projectId}&versionId=${versionId}&taskUserId=${taskUserId}&webId=${webId}
        &taskType=${taskType}&pageNumber=${pageNumber} &pageSize=${pageSize}&taskCount=${taskCount}`
    );
  }


}
