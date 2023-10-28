import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { FriendComponent } from './components/friend/friend.component';
import { ProfilePageComponent } from './profile-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfilePageComponent, FriendsListComponent, FriendComponent],
  imports: [CommonModule, ShareModule, ReactiveFormsModule],
})
export class ProfilePageModule {}
