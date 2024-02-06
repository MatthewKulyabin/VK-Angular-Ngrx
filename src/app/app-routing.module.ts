import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilePageComponent } from './features/profile-page/profile-page.component';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { SignupPageComponent } from './features/signup-page/signup-page.component';
import { AudioPageComponent } from './features/audio-page/audio-page.component';
import { MessagesPageComponent } from './features/messages-page/messages-page.component';
import { loginGuard } from './share/guards/login.guard';
import { NotFoundPageComponent } from './features/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'profile/:id',
    component: ProfilePageComponent,
    canActivate: [loginGuard],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'audio', component: AudioPageComponent, canActivate: [loginGuard] },
  {
    path: 'messages',
    component: MessagesPageComponent,
    canActivate: [loginGuard],
  },
  { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
