import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
@Injectable()
export class TaskInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            headers: req.headers.set('Content-Type', 'application/json'),
            // headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded'),
            withCredentials: true 
        });
        return next.handle(clonedRequest).map(event=>{
            if (event instanceof HttpResponse) {
                 if (event.body) {
                    if(event.body.code != '502' && event.body.code != 500 && event.body.code != '500'){
                        if(event.url.indexOf('getTaskByProperty') >0){
                            let newEvent = event.clone({body: event.body});
                            return newEvent;
                        }
                        let newEvent = event.clone({body: event.body['data']});
                        return newEvent;
                    }else if(event.body.code == 500 || event.body.code == '500'){
                        throw event.body.message;
                    }else if(event.body.code == "502"|| event.body.code == 502){
                        this.router.navigateByUrl('login');
                    }

                } 
            }
            return event;
        })

    }
}


