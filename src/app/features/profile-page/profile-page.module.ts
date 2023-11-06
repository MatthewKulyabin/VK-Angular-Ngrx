import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FriendsModule } from 'src/app/share/components/friends/friends.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CommonModule, ShareModule, ReactiveFormsModule, FriendsModule],
})
export class ProfilePageModule {}
