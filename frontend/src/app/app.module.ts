import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ArticlesModule } from './articles/articles.module';
import { StaticpagesModule } from './staticpages/staticpages.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AccountserviceService} from './account/services/accountservice.service';
import { ArticlesService } from './articles/services/articles.service';
import { AuthInterceptor } from './account/services/auth-interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AccountModule } from './account/account.module';
import { AuthGuard } from './account/services/auth.guard';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        BannerComponent,
        PagenotfoundComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        ArticlesModule,
        AccountModule,
        StaticpagesModule,
        AppRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        
    ],
    providers: [
        ArticlesService,
        AccountserviceService,AuthGuard,
        {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
        {provide:LocationStrategy,useClass:HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
