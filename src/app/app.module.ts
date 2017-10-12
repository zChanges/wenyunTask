import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutesModule } from "./app.routing";

// Component
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

// AJAX拦截器
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TaskInterceptorService } from "./taskInterceptor.service";

// 插件
import { NgZorroAntdModule } from "ng-zorro-antd";

// Service
import { RouterService } from "./service/router.service";
import { LoginService } from "./login/login.service";
import { ValueService } from "./service/value.service";
import { PublicMethodService } from "./service/publicMethod.service";

// pipe
import { DateAppendzeroPipe } from './pipe/dateAppendzero.pipe';


@NgModule({
  declarations: [AppComponent, LoginComponent,DateAppendzeroPipe],
  imports: [
    BrowserModule,
    AppRoutesModule,
    NgZorroAntdModule.forRoot(),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    RouterService,
    LoginService,
    ValueService,
    PublicMethodService,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TaskInterceptorService,
        multi: true
      }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
  