import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPageComponent } from './audio-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { FriendsModule } from 'src/app/share/components/friends/friends.module';

@NgModule({
  declarations: [AudioPageComponent],
  imports: [CommonModule, ShareModule, FriendsModule],
})
export class AudioPageModule {}
