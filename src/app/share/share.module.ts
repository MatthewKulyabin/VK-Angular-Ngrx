import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AvatarComponent } from './components/avatar/avatar.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostComponent } from './components/post/post.component';
import { PostsService } from './services/posts.service';
import { StoreModule } from '@ngrx/store';
import { reducers as postsReducers } from './state/posts/reducers';
import { reducers as usersReducers } from './state/users/reducers';
import { reducers as friendsReducers } from './state/friends/reducers';
import { reducers as audioReducers } from './state/audio/reducers';
import { reducers as messagesReducers } from './state/messages/reducers';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/posts/effects';
import { UsersService } from './services/users.service';
import { UsersEffects } from './state/users/effects';
import { FriendsService } from './services/friends.service';
import { FriendsEffects } from './state/friends/effects';
import { AudioService } from './services/audio.service';
import { AudioEffects } from './state/audio/effects';
import { MessagesService } from './services/messages.service';
import { MessagesEffects } from './state/messages/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './services/local.storage.service';
import { AudioComponent } from './components/audio/audio.component';
import { AudioListComponent } from './components/audio/audio-list/audio-list.component';

@NgModule({
  declarations: [
    AvatarComponent,
    HeaderComponent,
    NavComponent,
    PostsListComponent,
    PostComponent,
    AudioComponent,
    AudioListComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    // [Posts]
    StoreModule.forFeature('posts', postsReducers),
    EffectsModule.forFeature([PostsEffects]),
    // [Users]
    StoreModule.forFeature('users', usersReducers),
    EffectsModule.forFeature([UsersEffects]),
    // [Friends]
    StoreModule.forFeature('friends', friendsReducers),
    EffectsModule.forFeature([FriendsEffects]),
    // [Audio]
    StoreModule.forFeature('audio', audioReducers),
    EffectsModule.forFeature([AudioEffects]),
    // [Messages]
    StoreModule.forFeature('messages', messagesReducers),
    EffectsModule.forFeature([MessagesEffects]),
  ],
  exports: [
    AvatarComponent,
    HeaderComponent,
    NavComponent,
    PostsListComponent,
    PostComponent,
    AudioComponent,
    AudioListComponent,
  ],
  providers: [
    PostsService,
    UsersService,
    FriendsService,
    AudioService,
    MessagesService,
    LocalStorageService,
  ],
})
export class ShareModule {}
