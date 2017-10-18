import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { Http, HttpModule } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { RouterService } from "../service/router.service";

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private routerService: RouterService) {}
  login(userCode: string, password: string) :Observable<any>{
    return this.http.get(
      this.routerService.baseUrl +
        `user/login?userCode=${userCode}&password=${password}`
    );
  }

  loginOut() {
    return this.http.get(this.routerService.baseUrl + `user/leaveOut`);
  }
}
