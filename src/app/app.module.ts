import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app.routing';
import { LoginComponent } from './login/login.component';

// 插件
import { CKEditorModule } from 'ng2-ckeditor';

// Service
import { RouterService } from './service/router.service';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpModule,
    FormsModule,
    CKEditorModule,
    BrowserAnimationsModule
  ],
  providers: [
    RouterService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
