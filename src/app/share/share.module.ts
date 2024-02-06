import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AvatarComponent } from './components/avatar/avatar.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostComponent } from './components/post/post.component';
import { PostsService } from './services/posts.service';
import { reducers as postsReducers } from './state/posts/reducers';
import { reducers as usersReducers } from './state/users/reducers';
import { reducers as followersReducers } from './state/followers/reducers';
import { reducers as audioReducers } from './state/audio/reducers';
import { reducers as messagesReducers } from './state/messages/reducers';
import { PostsEffects } from './state/posts/effects';
import { UsersService } from './services/users.service';
import { UsersEffects } from './state/users/effects';
import { FollowersService } from './services/followers.service';
import { FollowersEffects } from './state/followers/effects';
import { AudioService } from './services/audio.service';
import { AudioEffects } from './state/audio/effects';
import { MessagesService } from './services/messages.service';
import { MessagesEffects } from './state/messages/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './services/local.storage.service';
import { AudioComponent } from './components/audio/audio.component';
import { AudioListComponent } from './components/audio/audio-list/audio-list.component';
import { FollowersListComponent } from './components/followers/followers-list/followers-list.component';
import { FollowerComponent } from './components/followers/follower/follower.component';
import { DeleteIconComponent } from './components/icons/delete-icon/delete-icon.component';
import { EditIconComponent } from './components/icons/edit-icon/edit-icon.component';
import { ModalComponent } from './components/modal/modal.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { ShowPasswordIconComponent } from './components/icons/show-password-icon/show-password-icon.component';
import { PlayIconComponent } from './components/icons/play-icon/play-icon.component';
import { PostsFormComponent } from './components/posts-list/posts-form/posts-form.component';

@NgModule({
  declarations: [
    AvatarComponent,
    HeaderComponent,
    NavComponent,
    PostsListComponent,
    PostComponent,
    AudioComponent,
    AudioListComponent,
    FollowersListComponent,
    FollowerComponent,
    DeleteIconComponent,
    EditIconComponent,
    ModalComponent,
    MessageFormComponent,
    ShowPasswordIconComponent,
    PlayIconComponent,
    PostsFormComponent,
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
    StoreModule.forFeature('followers', followersReducers),
    EffectsModule.forFeature([FollowersEffects]),
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
    FollowerComponent,
    FollowersListComponent,
    DeleteIconComponent,
    EditIconComponent,
    ModalComponent,
    MessageFormComponent,
    ShowPasswordIconComponent,
  ],
  providers: [
    PostsService,
    UsersService,
    FollowersService,
    AudioService,
    MessagesService,
    LocalStorageService,
  ],
})
export class ShareModule {}
