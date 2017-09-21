import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { RouterService } from '../service/router.service';
@Injectable()
export class LoginService {

    constructor(private http: Http, private routerService: RouterService) { }
    login(userCode, password) {
        return this.http.get(this.routerService.baseUrl + `user/login?userCode=${userCode}&password=${password}`);
    }
}
