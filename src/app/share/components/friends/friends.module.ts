import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendComponent } from './friend/friend.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { ShareModule } from '../../share.module';

@NgModule({
  declarations: [FriendComponent, FriendsListComponent],
  imports: [CommonModule, ShareModule],
  exports: [FriendComponent, FriendsListComponent],
})
export class FriendsModule {}
