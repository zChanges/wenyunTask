import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { RouterService } from "./../../service/router.service";

@Injectable()
export class ProcessFlowService {
  baseUrl: string;
  constructor(private routerService: RouterService, private http: Http) {
    this.baseUrl = this.routerService.baseUrl();
  }

  /**
   * 获取task
   */
  getTask(taskId: string) {
    return this.http.get(
        this.baseUrl + `task/getTask?taskId=${taskId}`
    );
  }

  /**
   * 获取过程
   */
  getTaskProcess(taskId: string) {
    return this.http.get(
      this.baseUrl + `taskProcess/getTaskProcess?taskId=${taskId}`
    );
  }
}