import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
@Injectable()
export class TaskInterceptorService implements HttpInterceptor {
  constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            headers: req.headers.set('Content-Type', 'application/json'),
            withCredentials: true 
        });
        return next.handle(clonedRequest).map(event=>{
            // if (event instanceof HttpResponse) {
            //     if(event.body){
            //         if(event.body.data){
            //             return event.body.data
            //         }else{
            //             throw event.body.message;
            //         }
            //     }
            //     return event
            // }
            if (event instanceof HttpResponse) {
                 if (event.body) {
                    if(event.body.data){
                        let newEvent = event.clone({body: event.body['data']});
                        return newEvent;
                    }else {
                        throw event.body.message;
                    }
                } 
            }
            return event;
        })

    }
}


