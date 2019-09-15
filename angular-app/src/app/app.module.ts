import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {CollapseModule, ModalModule} from 'ngx-bootstrap';


import {DashboardNavBarComponent} from './nav/dashboard-nav-bar/dashboard-nav-bar.component';
import {DashboardHeaderSection} from './dashboard-header-section/dashboard-header-section';
import {DashboardComponent} from './dashboard/dashboard.component';

import {AddItemComponent} from './dashboard-item/add-item/add-item.component';
import {ItemIncomeComponent} from './dashboard-item/category/item-income/item-income.component';
import {ItemExpenseComponent} from './dashboard-item/category/item-expense/item-expense.component';
import {ListItemsComponent} from './dashboard-item/list-items/list-items.component';


import {HomepageNavBarComponent} from './nav/homepage-nav-bar/homepage-nav-bar.component';
import {HomepageComponent} from './homepage/homepage.component';
import {HomepageHeaderSection} from './homepage-header-section/homepage-header-section';
import {HomepageShareHeadSection} from './homepage-share-head-section/homepage-share-head-section';

import {FooterSectionComponent} from './footer-section/footer-section.component';

import {ModalAboutComponent} from './modal/modal-about/modal-about.component';
import {ModalLoginComponent} from './modal/modal-login/modal-login.component';
import {ModalSignUpComponent} from './modal/modal-sign-up/modal-sign-up.component';
import {ModalSuccessComponent} from './modal/modal-success/modal-success.component';
import {ModalErrorComponent} from './modal/modal-error/modal-error.component';
import {ModalLoadingComponent} from './modal/modal-loading/modal-loading.component';
import {ModalFailedComponent} from './modal/modal-failed/modal-failed.component';


import {HttpConfigInterceptor} from './ts/network/interceptor/httpconfig.interceptor';

import {UserService} from './ts/network/service/user.service';
import {ErrorDialogService} from './ts/service/errordialog.service';
import {ItemDBService} from './ts/network/service/item-d-b.service';
import {ErrorHandlerService} from './ts/service/error-handler.service';
import {ItemUIService} from './ts/service/item-u-i.service';



@NgModule({
  declarations: [
    AppComponent,

    DashboardNavBarComponent,
    DashboardHeaderSection,
    DashboardComponent,

    ItemIncomeComponent,
    ItemExpenseComponent,
    ListItemsComponent,
    AddItemComponent,

    HomepageNavBarComponent,
    HomepageComponent,
    HomepageHeaderSection,
    HomepageShareHeadSection,

    FooterSectionComponent,

    ModalAboutComponent,
    ModalLoginComponent,
    ModalSignUpComponent,
    ModalSuccessComponent,
    ModalErrorComponent,
    ModalFailedComponent,
    ModalLoadingComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],

  providers: [
    ItemUIService,
    UserService,
    ItemDBService,
    ErrorHandlerService,
    ErrorDialogService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}
  ],

  entryComponents: [ModalErrorComponent, ModalSuccessComponent, ModalFailedComponent, ModalLoadingComponent],

  bootstrap: [AppComponent]
})

export class AppModule {
}
