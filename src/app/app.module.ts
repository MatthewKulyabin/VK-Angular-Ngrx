import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageModule } from './features/profile-page/profile-page.module';
import { ShareModule } from './share/share.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SignupPageModule } from './features/signup-page/signup-page.module';
import { LoginPageModule } from './features/login-page/login-page.module';
import { AudioPageModule } from './features/audio-page/audio-page.module';
import { MessagePageModule } from './features/messages-page/message-page.module';
import { NotFoundPageModule } from './features/not-found-page/not-found-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),

    ProfilePageModule,
    SignupPageModule,
    LoginPageModule,
    AudioPageModule,
    MessagePageModule,
    NotFoundPageModule,

    ShareModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
