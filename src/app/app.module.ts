import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { AppRoutesModule } from "./app.routing";
import { LoginComponent } from "./login/login.component";

//插件
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule, 
    AppRoutesModule, 
    HttpModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
