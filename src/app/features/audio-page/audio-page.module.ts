import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AudioPageComponent } from './audio-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { FollowersModule } from 'src/app/share/components/followers/followers.module';
import { AudioFormComponent } from './audio-form/audio-form.component';

@NgModule({
  declarations: [AudioPageComponent, AudioFormComponent],
  imports: [CommonModule, ShareModule, FollowersModule, ReactiveFormsModule],
})
export class AudioPageModule {}
