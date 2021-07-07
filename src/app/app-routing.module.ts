import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
//147 делаем импорт AuthGuard
import { AuthGuard } from './auth-guard.service';
//150 делаем импорт CanDeactivateGuard
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
//151 импорт ErrorPageComponent
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }
  ] },
  {
    path: 'servers',
    //147 вешаем на ServersComponent - canActivate: [AuthGuard]
    // canActivate: [AuthGuard],
    //148 подлючаем canActivateChild: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      //152 включаем ServerResolver - resolve: {server: ServerResolver}
    { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
      //150 включаем canDeactivate: [CanDeactivateGuard] на EditServerComponent компоненте
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
  ] },
  // { path: 'not-found', component: PageNotFoundComponent },
  //151 передаем сообщение в ErrorPageComponent из data: {message: 'любое сообщение'}
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    //153 для установки Hash:
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
