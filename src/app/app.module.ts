import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout'
import {AppRoutingModule} from './app-routing/app-routing.module';
import {DishService} from './services/dish.service';
import {LeaderService} from './services/leader.service'
import {PromotionService} from './services/promotion.service';
import {ReactiveFormsModule} from '@angular/forms';

import {baseURL} from './shared/baseURL';
import {ProcessHTTPMsgService} from './services/process-httpmsg.service';

import { RestangularModule, Restangular } from 'ngx-restangular';
import {RestangularConfigFactory} from './shared/restConfig';

import 'hammerjs';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {DishDetailComponent} from './dish-detail/dish-detail.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './login/login.component';
import {HighlightDirective} from './directives/highlight.directive';
import {FeedbackService} from './services/feedback.service';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        DishDetailComponent,
        HeaderComponent,
        FooterComponent,
        AboutComponent,
        HomeComponent,
        ContactComponent,
        LoginComponent,
        HighlightDirective
    ],
    imports: [
        FlexLayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RestangularModule.forRoot(RestangularConfigFactory)
    ],
    providers: [DishService,
        PromotionService,
        LeaderService,
        FeedbackService,
        ProcessHTTPMsgService,
        {provide: 'BaseURL', useValue: baseURL}],
    entryComponents: [LoginComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
