import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowerComponent } from './follower/follower.component';
import { FollowersListComponent } from './followers-list/followers-list.component';
import { ShareModule } from '../../share.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ShareModule],
  exports: [FollowerComponent, FollowersListComponent],
})
export class FollowersModule {}
