import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './ts/network/service/auth-guard.service';

const routes: Routes = [

  {path: 'homepage', component: HomepageComponent, canActivate: [AuthGuardService]},

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},

  {path: '**', redirectTo: 'homepage'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}



