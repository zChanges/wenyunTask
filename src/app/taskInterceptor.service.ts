import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpResponse } from "@angular/common/http";
import {Observable} from "rxjs/Observable";
@Injectable()
export class TaskInterceptorService implements HttpInterceptor {
  constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const authReq = req.clone({setHeaders: {Authorization: authHeader}});
        const clonedRequest = req.clone({
            headers: req.headers.set('X-CustomAuthHeader', '设置token')
        });
        console.log("new headers", clonedRequest.headers.keys());
        // return next.handle(clonedRequest);
        return next.handle(clonedRequest)
        // .map(event => {
        //     if (event instanceof HttpResponse) {
        //       if (event.status === 401) {
        //         // JWT expired, go to login
        //       }
        //     }
        //     return event;
        // }
    }
}


