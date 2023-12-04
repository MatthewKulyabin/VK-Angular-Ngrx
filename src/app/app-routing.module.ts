import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './features/profile-page/profile-page.component';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { SignupPageComponent } from './features/signup-page/signup-page.component';
import { AudioPageComponent } from './features/audio-page/audio-page.component';
import { MessagesPageComponent } from './features/messages-page/messages-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'audio', component: AudioPageComponent },
  { path: 'messages', component: MessagesPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
